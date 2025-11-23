const router = require("express").Router();
const Order = require("../models/Order");
const Parcel = require("../models/Parcel");

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

    // Create parcel from order data
    const newParcel = new Parcel({
      from: order.pickupCity,
      to: order.deliveryCity,
      sendername: order.senderName,
      recipientname: order.recipientName,
      senderemail: order.senderEmail,
      recipientemail: order.recipientEmail,
      weight: order.weight,
      note: order.note,
      status: 1, // Pending status
      originBranch: order.originBranch._id,
      destinationBranch: order.destinationBranch._id,
      cost: req.body.cost || 0,
      date: new Date().toISOString(),
    });

    const savedParcel = await newParcel.save();

    // Update order status to Approved
    order.status = "Approved";
    await order.save();

    res.status(201).json({
      message: "Order approved and parcel created successfully",
      parcel: savedParcel,
      order: order,
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
