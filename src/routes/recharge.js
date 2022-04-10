const { Router } = require("express");
const router = Router();
const RechargeController = require("../controller/recharge.controller");
const rechargeController = new RechargeController();
const { check } = require("express-validator");
const { validateAmount, validatePhoneNumber, validateData } = require("../middlewares/export");



router.post("/buy", [
    check("clientTransId", "client id is not empty").not().isEmpty(),
    check("amount", "ammout is empty").not().isEmpty(),
    check("phoneNumber", "phone number is empty").not().isEmpty(),
    check("supplierId", "supplier id is empty").not().isEmpty(),
    validatePhoneNumber, 
    validateAmount,
    validateData

],
    rechargeController.buy());


module.exports = router;