const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_key";
const Custommer = require("../models/custommerModel");

class loginController {
  index(req, res) {
    res.render("client/login", { layout: "mainClient" });
  }
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // Tìm người dùng theo email
      const custommer = await Custommer.findOne({ email });
      if (!custommer) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }
      // Kiểm tra mật khẩu
      const isMatch = bcrypt.compareSync(password, custommer.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }
      // kiểm tra tài khoản còn hoạt động hay không

      if (!custommer.is_open) {
        return res.status(400).json({ message: "Tài khoản đã bị khóa" });
      }

      // Tạo token
      const token = jwt.sign(
        { id: custommer._id, email: custommer.email },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token, { httpOnly: true });
      res.cookie(
        "custommer",
        JSON.stringify({
          id: custommer._id,
          username: custommer.username,
          email: custommer.email,
        }),
        {
          httpOnly: true,
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Có lỗi xảy ra" });
    }
  }
}

module.exports = new loginController();
