const bcrypt = require("bcryptjs");
const Custommer = require("../models/custommerModel");
class registerController {
  index(req, res) {
    res.render("client/register", { layout: "mainClient" });
  }
  async create(req, res, next) {
    const { username, email, password, phone, address } = req.body;

    try {
      // Kiểm tra xem  email đã tồn tại hay chưa
      const existingCustommer = await Custommer.findOne({ email });
      if (existingCustommer) {
        return res.status(400).json({ message: "Email  đã tồn tại" });
      }
      // Kiểm tra xem số điện thoại đã tồn tại hay chưa
      const phoneExists = await Custommer.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: "Số điện thoại đã tồn tại" });
      }

      // Mã hóa mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Tạo người dùng mới
      const newCustommer = new Custommer({
        username,
        email,
        phone,
        address,
        password: hashedPassword,
      });

      await newCustommer.save();
      res.status(201).json({ message: "Tạo tài khoản thành công." });
    } catch (error) {
      console.log(error);
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = new registerController();
