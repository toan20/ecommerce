const express = require("express");
const router = express.Router();
const orderAdminController = require("../app/controllers/orderAdminController");
const middlewareAdmin = require("../app/middleware/authAdmin");

router.get("/order", middlewareAdmin, orderAdminController.view);
router.get("/order/getdata", middlewareAdmin, orderAdminController.getdata);
router.put("/order/status/:id", orderAdminController.edit);

module.exports = router;
