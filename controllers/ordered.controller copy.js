const Ordered = require("../models/Ordered.model");
const dayjs = require("dayjs")

module.exports.orderedController = {
  getOrdered: async (req, res) => {
    try {
      const responce = await Order.find();
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  createOrdered: async (req, res) => {
    try {
      const { clientId, foodId, cafeId, total, from, to, receivedAt } = req.body;
      const order = await Ordered.create({
        clientId,
        foodId,
        cafeId,
        total,
        from,
        to,
        receivedAt: dayjs().format(`HH:mm`)
      });
      res.status(200).json(order);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteOrdered: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Заказ удален");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  acceptOrdered: async (req, res) => {
    const courierId = req.user.cafeId
    try {
      const editedOrder = await Order.findByIdAndUpdate(req.params.id, {courierId: courierId, status: "atCourier"}, {new: true});
      console.log(editedOrder)
      res.json(editedOrder);
    }catch (e) {
      res.json({ error: e.toString() });
    }
  },
  deliverOrdered: async (req, res) => {
    // const courierId = req.user.cafeId
    console.log(req.params.id)
    try {
      const currentOrder = await Order.findById(req.params.id);
      currentOrder.status = "atClient"
      await currentOrder.save();
      // const editedOrder = await Order.findByIdAndUpdate(req.params.id, {courierId: courierId, status: "atCourier"}, {new: true});
      console.log(currentOrder)
      res.json(currentOrder);
    }catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getOrderedById: async (req, res) => {
    try {
      const oneOrdered = await Ordered.findById(req.params.id);
      res.status(200).json(oneOrdered);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
};
