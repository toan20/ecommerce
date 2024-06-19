const express = require("express");
const router = express.Router();
const middlewareCustommer = require("../app/middleware/authCustommer");
const cartController = require("../app/controllers/cartController");

router.post("/", middlewareCustommer, cartController.add);
router.get("/store", middlewareCustommer, cartController.store);
router.get("/view", middlewareCustommer, cartController.index);
router.delete("/delete/:id", cartController.destroy);
router.put("/quantity/:id", middlewareCustommer, cartController.quantity);

module.exports = router;
