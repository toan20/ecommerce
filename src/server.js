// const morgan = require("morgan");
const path = require("path");
const express = require("express");
// const handlebars = require("express-handlebars").engine
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const routes = require("./routes");
const db = require("./config/db/index");
const cookieParser = require("cookie-parser");

const Handlebars = require("handlebars");

// Đăng ký helper tùy chỉnh

Handlebars.registerHelper("formatCurrencyVND", function (number) {
  if (typeof number !== "number") {
    return number;
  }
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
});
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
