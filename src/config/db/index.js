const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Food");
    console.log("THành công");
  } catch (error) {
    console.log("Thất bại");
  }
}

module.exports = { connect };