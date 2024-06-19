const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Produce = new Schema({
  // _id: { type: String },
  name: { type: String, maxLength: 255, required: true, unique: true },
  img: { type: String, required: true },
  description: { type: String, maxLength: 255, required: true },
  slug: { type: String, slug: "name", unique: true },
  price: { type: Number, required: true },
  priceOld: { type: Number, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createAt: { type: Date, default: Date.now },
  updateeAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Produce", Produce);
