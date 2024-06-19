const express = require("express");
const router = express.Router();
const categoryController = require("../app/controllers/categoryController.js");
const middlewareAdmin = require("../app/middleware/authAdmin.js");

router.put("/category/edit/:id", categoryController.update);
router.get("/category/get-data/:id", categoryController.getDataUpdate);
router.get("/category", middlewareAdmin, categoryController.index);
router.post("/category/create", categoryController.create);
router.delete("/category/delete/:id", categoryController.destroy);
router.get("/category/get-data", categoryController.getData);

module.exports = router;
