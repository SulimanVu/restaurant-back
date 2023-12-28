const { foodController } = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");

const { Router } = require("express");
const uploadImages = require("../middleware/uploadImages");

const router = Router();

router.get("/", foodController.getAllFood);
router.post("/", authMiddleware, uploadImages.single("image") ,foodController.createFood);
router.delete("/:id", authMiddleware, foodController.deleteFood);
router.get("/category/:id", foodController.getFoodByCategoryId);
router.get("/cafe/", authMiddleware, foodController.getFoodByCafeToken);
router.patch("/edit", authMiddleware, uploadImages.single("image"), foodController.editFood)


module.exports = router;
