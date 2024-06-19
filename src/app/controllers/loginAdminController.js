const bcrypt = require("bcryptjs");
const Account = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secure_secret_key";

class loginAdminController {
  index(req, res) {
    res.render("admin/loginAdmin", {
      layout: false,
      title: "No Header Footer Page",
    });
  }
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // Tìm người dùng theo email
      const user = await Account.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }

      // Kiểm tra mật khẩu
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }
      // kiểm tra tài khoản còn hoạt động hay không

      if (!user.is_open) {
        return res.status(400).json({ message: "Tài khoản đã bị khóa" });
      }

      // Tạo token
      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.cookie(
        "user",
        JSON.stringify({ username: user.username, email: user.email }),
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

module.exports = new loginAdminController();
