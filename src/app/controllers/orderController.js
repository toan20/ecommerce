const Custommer = require("../models/custommerModel");
const Order = require("../models/orderModel");
class orderController {
  async order(req, res, next) {
    const { custommerId, items, totalAmount } = req.body;
    try {
      const custommers = await Custommer.findById(custommerId).populate(
        "cart.produce"
      );

      if (!custommers) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }
      const order = new Order({
        custommer: custommerId,
        items: items.map((item) => ({
          produce: item.produce._id,
          quantity: item.quantity,
        })),
        totalAmount,
      });
      await order.save();

      // Clear user's cart
      custommers.cart = [];
      await custommers.save();
      res.status(200).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  getvalue(req, res) {
    const custummers = JSON.parse(req.cookies.custommer);
    const custummerId = custummers.id;
    Order.find({ custommer: custummerId })
      .populate("custommer")
      .populate("items.produce")
      .then((order) => {
        res.json(order);
      });
  }
  view(req, res) {
    res.render("client/order", { layout: "mainClient" });
  }
}

module.exports = new orderController();
