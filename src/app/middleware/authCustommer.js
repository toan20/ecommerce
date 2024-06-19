const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_key";

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // return res.render("client/login", {
    //   layout: "mainClient",
    //   message: "Bạn chưa đăng nhập",
    // });
    res.status(403).json({ message: "Bạn chưa đăng nhập" });
    // return res.render("client/login", {
    //   layout: "mainClient",
    // });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    const userCookie = req.cookies.custommer;
    req.userInfo = userCookie ? JSON.parse(userCookie) : null;
    res.locals.userInfo = req.userInfo; // Thêm thông tin người dùng vào res.locals
    // xóa token sau 1h
    const oneHourInSeconds = 3600;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: oneHourInSeconds * 1000,
    });
    next();
  } catch (error) {
    console.log(error);
    return res.render("client/login", {
      layout: "mainClient",
      message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.",
    });
  }
};

module.exports = auth;
