const bcrypt = require("bcryptjs");
const Account = require("../models/accountModel");
class accountController {
  // GET : /admin/account/
  index(req, res) {
    res.render("admin/account");
  }
  //POST : /admin/account/create
  async create(req, res, next) {
    const { username, email, password } = req.body;

    try {
      // Kiểm tra xem username hoặc email đã tồn tại hay chưa
      const existingUser = await Account.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại" });
      }

      // Mã hóa mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Tạo người dùng mới
      const newAccount = new Account({
        username,
        email,
        password: hashedPassword,
      });

      await newAccount.save();
      res.status(201).json({ message: "Tạo tài khoản thành công." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
  // GET : /admin/account/get-data
  getData(req, res) {
    Account.find({})
      .lean()
      .then((data) => res.json(data));
  }

  // DELETE : /admin/account/delete/:id
  destroy(req, res, next) {
    Account.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }

  // PUT : admin/account/action/:id
  editAction(req, res, next) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }
}

module.exports = new accountController();
