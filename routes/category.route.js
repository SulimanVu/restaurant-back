const { categoryController } = require("../controllers/category.controller");

const { Router } = require("express");

const router = Router();

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
