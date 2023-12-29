const Cafe = require("../models/Cafe.model");
const Food = require("../models/Food.model");

module.exports.foodController = {
  getAllFood: async (req, res) => {
    try {
      const allFood = await Food.find();
      res.status(200).json(allFood);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getFoodByCafeId: async (req, res) => {
    const { cafeId } = req.body;

    try {
      const foodByCafe = await Cafe.findById(cafeId);
      console.log(foodByCafe);
      return foodByCafe.menu;
      // res.json(foodByCafeId)
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  createFood: async (req, res) => {
    const { name, info, categoryId, price } = req.body;

    try {
      const newFood = await Food.create({
        name,
        image: req.files.map((file) => file.path), // Массив путей к изображениям
        info,
        categoryId,
        price,
        cafeId: req.user.cafeId,
      });

      res.status(200).json(newFood);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteFood: async (req, res) => {
    try {
      await Food.findByIdAndDelete(req.params.id);
      res.status(200).json("Корзина удалена");
    } catch {
      res.status(400).json({ error: e.toString() });
    }
  },

  //Получение еды по категории(без не обходимости не менять):
  getFoodByCategoryId: async (req, res) => {
    try {
      const foodByCategoryId = await Cafe.find({ categoryId: req.params.id });
      res.json(foodByCategoryId);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getFoodByCafeToken: async (req, res) => {
    const cafeId = req.user.cafeId;
    try {
      const foodByCafeToken = await Food.find({ cafeId: cafeId });
      res.json(foodByCafeToken);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  editFood: async (req, res) => {
    const { cafeId } = req.user;
    const { foodId } = req.body;

    try {
      // Получите текущую еду
      const currentFood = await Food.findById(foodId);

      // Обновите только те поля, которые переданы в запросе
      const updatedFields = {
        ...req.body,
        cafeId,
        image:
          req.files.length > 0
            ? req.files[0].path
            : currentFood
            ? currentFood.image
            : "",
      };

      // Обновите блюдо по foodId
      const editedFood = await Food.findByIdAndUpdate(foodId, updatedFields, {
        new: true,
      });

      res.json(editedFood);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
};
