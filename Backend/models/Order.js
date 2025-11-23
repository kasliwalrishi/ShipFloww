const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    // Sender Details
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String, required: true },
    senderCity: { type: String, required: true },

    // Recipient Details
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    recipientPhone: { type: String, required: true },
    recipientCity: { type: String, required: true },

    // Parcel Details
    weight: { type: Number, required: true },
    note: { type: String },
    pickupCity: { type: String, required: true },
    deliveryCity: { type: String, required: true },

    // Branch References
    originBranch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    destinationBranch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    // Order Status
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    requestDate: { type: Date, default: Date.now },
    requestId: { type: String, unique: true },
  },
  { timestamps: true }
);

// Generate unique request ID before saving
OrderSchema.pre("save", async function (next) {
  if (!this.requestId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    this.requestId = `ORD-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
