const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/orderController");
const middlewareCustommer = require("../app/middleware/authCustommer");

router.post("/", orderController.order);
router.get("/view", middlewareCustommer, orderController.view);
router.get("/getvalue", orderController.getvalue);

module.exports = router;
