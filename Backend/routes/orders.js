const router = require("express").Router();
const Order = require("../models/Order");
const Parcel = require("../models/Parcel");
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const { sendOrderApprovalEmail } = require("../services/OrderApprovalEmail");

// Helper function to generate random password
const generateRandomPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// CREATE NEW ORDER
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
      requestId: savedOrder.requestId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("originBranch")
      .populate("destinationBranch")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("originBranch")
      .populate("destinationBranch");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ORDER STATUS (for rejection/approval without creating parcel)
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
      .populate("originBranch")
      .populate("destinationBranch");
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// APPROVE ORDER AND CREATE PARCEL
router.post("/:id/approve", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("originBranch")
      .populate("destinationBranch");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Approved") {
      return res.status(400).json({ message: "Order already approved" });
    }

    // Validate required fields from request
    const { weight, cost, originBranch, destinationBranch, note = "", date } = req.body;
    
    if (!weight || !cost || !originBranch || !destinationBranch) {
      return res.status(400).json({ 
        message: "Missing required fields: weight, cost, originBranch, destinationBranch" 
      });
    }

    // Create parcel with all provided fields
    const newParcel = new Parcel({
      from: order.pickupCity,
      to: order.deliveryCity,
      sendername: order.senderName,
      recipientname: order.recipientName,
      senderemail: order.senderEmail,
      recipientemail: order.recipientEmail,
      weight: weight,
      cost: cost,
      note: note,
      date: date || new Date().toISOString(),
      status: 0, // Set to 0 so background service sends pending notification emails
      originBranch: originBranch,
      destinationBranch: destinationBranch,
    });

    const savedParcel = await newParcel.save();

    // Auto-create user for sender if they don't exist
    let createdUser = null;
    let generatedPassword = null;
    try {
      const existingUser = await User.findOne({ email: order.senderEmail });
      
      if (!existingUser) {
        // Generate random password
        generatedPassword = generateRandomPassword();
        
        // Encrypt password
        const hashedPassword = CryptoJs.AES.encrypt(
          generatedPassword,
          process.env.PASS
        ).toString();

        // Create new user with status 0 (for email notification)
        createdUser = new User({
          fullname: order.senderName,
          email: order.senderEmail,
          age: 0,
          country: "Pakistan", // Default country
          address: order.senderCity,
          password: hashedPassword,
          status: 0, // Set to 0 for background service to send welcome email
          role: "user",
        });

        await createdUser.save();
        
        // Send order approval email with tracking ID and credentials
        await sendOrderApprovalEmail(
          order.senderEmail,
          order.senderName,
          generatedPassword,
          savedParcel._id.toString(),
          order.recipientName,
          order.deliveryCity,
          weight,
          cost
        );
      }
    } catch (userError) {
      console.error("Error creating user or sending email:", userError);
      // Continue anyway - don't fail the parcel creation
    }

    // Update order status to Approved
    order.status = "Approved";
    await order.save();

    res.status(201).json({
      message: "Order approved and parcel created successfully",
      parcel: savedParcel,
      order: order,
      userCreated: createdUser ? true : false,
      userEmail: createdUser ? createdUser.email : null,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ORDER (Reject)
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order rejected and deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
