const Order = require("../models/orderModel");

class orderAdminController {
  view(req, res) {
    res.render("admin/order");
  }
  getdata(req, res) {
    Order.find({})
      .lean()
      .populate("custommer")
      .populate("items.produce")
      .then((data) => res.json(data));
  }
  edit(req, res) {
    Order.updateOne({ _id: req.params.id }, req.body).then(() => {
      res.send("Thành công");
    });
  }
}

module.exports = new orderAdminController();
