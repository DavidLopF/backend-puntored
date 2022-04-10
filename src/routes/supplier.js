const { Router } = require("express");
const router = Router();
const SuplierController = require("../controller/supplier.controller");
const supplierController = new SuplierController();



router.get("/all", supplierController.getSuppliers());


module.exports = router;