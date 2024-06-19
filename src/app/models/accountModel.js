const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_open: { type: Boolean, default: true },
});

module.exports = mongoose.model("Account", Account);
