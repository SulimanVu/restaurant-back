const { cafeController } = require("../controllers/cafe.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const uploadImages = require("../middleware/uploadImages");

const router = Router();

router.get("/", cafeController.getAllCafe);
router.post("/signup", cafeController.signUpCafe);
router.delete("/:id", authMiddleware, cafeController.deleteCafe);
router.get("/:id", cafeController.getOneCafeById);
router.patch("/edit", authMiddleware, uploadImages.single('image'), cafeController.editCafe);
router.get("/profile/user", authMiddleware, cafeController.getCafeByToken)

module.exports = router;
