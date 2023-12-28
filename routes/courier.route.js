const { courierController } = require("../controllers/courier.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/", courierController.getAllCouriers);
router.delete("/:id", courierController.deleteCourier);
router.patch("/:id", courierController.editCourier);
router.post("/signup", courierController.signUpCourier);
router.get("/profile/user", authMiddleware, courierController.getCourierByToken);
// router.post("/signin", courierController.signIn);

module.exports = router;
