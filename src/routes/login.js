const express = require("express");
const router = express.Router();
const loginController = require("../app/controllers/loginController");

router.get("/login", loginController.index);
router.post("/login", loginController.login);

module.exports = router;
