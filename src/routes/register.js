const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/registerController");

router.get("/register", registerController.index);
router.post("/register", registerController.create);

module.exports = router;
