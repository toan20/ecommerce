const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  produce: { type: Schema.Types.ObjectId, ref: "Produce" },
  quantity: { type: Number, default: 1 },
});

const Custommer = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_open: { type: Boolean, default: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  cart: [CartItemSchema],
});

module.exports = mongoose.model("Custommer", Custommer);
