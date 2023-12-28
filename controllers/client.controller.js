const Client = require("../models/Client.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.clientController = {
  getAllClients: async (req, res) => {
    try {
      const responce = await Client.find();
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  getOneClient: async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      res.json(client)
    } catch (err) {
      res.json(500).json(err)
    }
  },

  deleteClient: async (req, res) => {
    try {
      await Client.findByIdAndDelete(req.params.id);
      res.status(200).json("Клиент удален");
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  signUpClient: async (req, res) => {
    const { name, phone, city, address, mail, password } = req.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
    try {
      await Client.create({
        name,
        phone,
        city,
        address,
        mail,
        password: hash
      });
      res.status(200).json("Клиент добавлен");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  getClientByToken: async (req, res) => {
    const clientId = req.user.cafeId
    try {
      const clientCurrent = await Client.findById(clientId);
      res.json(clientCurrent);
    } catch (e) {
      res.json({error: e.toString()})
    }
  }
};
