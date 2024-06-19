const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  custommer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Custommer",
    required: true,
  },
  items: [
    {
      produce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produce",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Chờ xác nhận" }, // pending, confirmed, shipped, delivered, cancelled
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", Order);
