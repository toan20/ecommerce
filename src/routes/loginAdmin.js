const express = require("express");
const router = express.Router();
const loginAdminController = require("../app/controllers/loginAdminController.js");

router.get("/login", loginAdminController.index);
router.post("/login/1", loginAdminController.login);

module.exports = router;
