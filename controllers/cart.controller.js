const Cart = require("../models/Cart.model");

module.exports.cartController = {
  getCart: async (req, res) => {
    try {
      const responce = await Cart.find();
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  createCart: async (req, res) => {
    try {
      const { foodId, cafeId } = req.body
      const responce = await Cart.create({
        foods: [{ foodId }],
        cafeId: cafeId
      })
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Корзина удалена");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  //Добавление еды в корзину
  addFood: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const { foodId } = req.body
      await Cart.findByIdAndUpdate(cartId, {
        $push: { foods: { foodId } }
      })
      const responce = await Cart.findById(cartId)
      res.status(200).json(responce)
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  //Получение еды из корзины
  getCartById: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const responce = await Cart.findById(cartId)
      res.status(200).json(responce)
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  //Изменение одного элемента корзины
  changeOneElem: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const { foodId } = req.body
      const { count } = req.body

      await Cart.updateOne({ _id: cartId, "foods.foodId": foodId }, { $set: { "foods.$.count": count } })
      const responce = await Cart.findById(cartId)
      res.status(200).json(responce)
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  //Удаление одного элемента
  removeOneElem: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const { foodId } = req.body

      await Cart.updateOne({ _id: cartId}, { $pull:{foods : {foodId: foodId}}})
      const responce = await Cart.findById(cartId)
      res.status(200).json(responce)

    } catch(e) {
      res.status(400).json({ error: e.toString() });
    }
  }
};


