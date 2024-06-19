const express = require("express");
const router = express.Router();
const produceController = require("../app/controllers/produceController");
const middlewareAdmin = require("../app/middleware/authAdmin.js");

router.get("/produce", middlewareAdmin, produceController.index);
router.post("/produce/create", produceController.create);
router.delete("/produce/delete/:id", produceController.destroy);
router.get("/produce/get-data/:id", produceController.getDataUpdate);
router.put("/produce/edit/:id", produceController.update);
router.get("/produce/get-data", produceController.getData);

module.exports = router;
