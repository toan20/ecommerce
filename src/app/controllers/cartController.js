const Produce = require("../models/produceModel");
const Custommer = require("../models/custommerModel");
class clientController {
  index(req, res) {
    res.render("client/cart", { layout: "mainClient" });
  }
  async add(req, res) {
    try {
      const { produceId, quantity } = req.body;
      const custummers = JSON.parse(req.cookies.custommer);
      const custummerId = custummers.id;
      // kiểm tra người dùng có tồn tại hay không
      const custommer = await Custommer.findById(custummerId);
      if (!custommer) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      // kiểm tra sản phẩm có tồn tại hay không
      const product = await Produce.findById(produceId);
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      // tìm sản phẩm đã có trong giỏ hàng hay chưa
      const cartItemIndex = custommer.cart.findIndex((item) =>
        item.produce.equals(produceId)
      );
      if (cartItemIndex >= 0) {
        custommer.cart[cartItemIndex].quantity += quantity;
      } else {
        custommer.cart.push({ produce: produceId, quantity });
      }

      await custommer.save();

      res
        .status(200)
        .json({ message: "Thêm sản phẩm vào giỏ hàng thành công" });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async store(req, res, next) {
    const custummers = JSON.parse(req.cookies.custommer);
    const custummerId = custummers.id;
    const cart = await Custommer.findById(custummerId)
      .populate("cart.produce")
      .lean();
    res.json(cart);
  }
  async destroy(req, res, next) {
    try {
      const custummers = JSON.parse(req.cookies.custommer);
      const custummerId = custummers.id;
      const productId = req.params.id;

      const custummer = await Custommer.findById(custummerId);
      if (!custummer) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const productIndex = custummer.cart.findIndex((item) =>
        item.produce.equals(productId)
      );
      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong giỏ hàng" });
      }

      custummer.cart.splice(productIndex, 1);
      await custummer.save();

      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async quantity(req, res, next) {
    try {
      const { quantity } = req.body;
      const produceId = req.params.id;
      const custummers = JSON.parse(req.cookies.custommer);
      const custummerId = custummers.id;
      // kiểm tra người dùng có tồn tại hay không
      const custommer = await Custommer.findById(custummerId);
      if (!custommer) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      const productIndex = custommer.cart.findIndex((item) =>
        item.produce.equals(produceId)
      );

      if (productIndex >= 0) {
        custommer.cart[productIndex].quantity = quantity;
      } else {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong giỏ hàng" });
      }

      await custommer.save();

      res.status(200).json({ message: "Cập nhật giỏ hàng thành công" });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = new clientController();
