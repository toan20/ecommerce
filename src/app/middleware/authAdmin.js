const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secure_secret_key";

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("admin/loginAdmin", {
      layout: false,
      title: "No Header Footer Page",
    });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    const userCookie = req.cookies.user;
    req.userInfo = userCookie ? JSON.parse(userCookie) : null;
    res.locals.userInfo = req.userInfo; // Thêm thông tin người dùng vào res.locals
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = auth;
