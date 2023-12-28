const Guest = require("../models/Guest.model");

module.exports.guestController = {
  addGuest: async (req, res) => {
    try {
      const guest = await Guest.create({
        role: req.body.role
      });
      res.status(200).json(guest);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  deleteGuest: async (req, res) => {
    try {
      await Guest.findByIdAndDelete(req.params.id);
      res.status(200).json("Гость удален");
    } catch (e) {
      res.json({ error: e.toString() });
    }
  }
};
