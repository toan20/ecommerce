const categoryRoute = require("./category");
const produceRoute = require("./produce");
const accountRoute = require("./account");
const loginAdmin = require("./loginAdmin");
const orderAdmin = require("./orderAdmin");
const cart = require("./cart");
const produce = require("../app/models/produceModel");
const category = require("../app/models/categoryModel");
const register = require("./register");
const login = require("./login");
const order = require("./order");

const mid = require("../app/middleware/authCustommer");

function routes(app) {
  // hiện thị sản phẩm ra trang chủ
  app.get("/", async (req, res, next) => {
    try {
      const produces = await produce.find({}).populate("category").lean();
      const categories = await category.find({}).lean();
      res.render("client/home", {
        categories,
        produces,
        layout: "mainClient",
      });
    } catch (err) {
      next(err);
    }
  });
  // hiện thị chi tiết sản phẩm
  app.get("/produce-detail/:slug", (req, res, next) => {
    produce
      .findOne({ slug: req.params.slug })
      .lean()
      .then((produce) => {
        res.render("client/produceDetails", {
          produce,
          layout: "mainClient",
        });
      })
      .catch(next);
  });
  app.use("/", login);
  app.use("/", register);
  app.use("/cart", cart);
  app.use("/order", order);
  app.use("/admin", orderAdmin);
  app.use("/admin", categoryRoute);
  app.use("/admin", produceRoute);
  app.use("/admin", accountRoute);
  app.use("/admin", loginAdmin);

  app.get("/admin/logoutAdmin", (req, res) => {
    res.clearCookie("token"); // Xóa cookie token
    res.clearCookie("user"); // Xóa cookie user nếu bạn lưu thông tin người dùng ở đó
    res.redirect("/admin/login"); // Chuyển hướng tới trang đăng nhập
  });
  app.get("/logout", (req, res) => {
    res.clearCookie("token"); // Xóa cookie token
    res.clearCookie("custommer"); // Xóa cookie user nếu bạn lưu thông tin người dùng ở đó
    res.redirect("/"); // Chuyển hướng tới trang đăng nhập
  });
}
module.exports = routes;
