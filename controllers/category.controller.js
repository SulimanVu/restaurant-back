const Category = require("../models/Category.model");

module.exports.categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const responce = await Category.find();
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      res.status(200).json("Категория создана");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.param.id);
      res.status(200).json("Категория удалена");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
};
