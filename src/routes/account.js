const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController.js");
const middlewareAdmin = require("../app/middleware/authAdmin.js");

router.get("/account", middlewareAdmin, accountController.index);
router.post("/account/create", accountController.create);
router.get("/account/get-data", accountController.getData);
router.delete("/account/delete/:id", accountController.destroy);
router.put("/account/action/:id", accountController.editAction);

module.exports = router;
