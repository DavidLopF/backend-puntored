const { Router } = require("express");
const router = Router();
const AuthController = require("../controller/auth.controller");
const authController = new AuthController();



router.post("/", authController.login());

router.get("/", authController.getlogin());


module.exports = router;