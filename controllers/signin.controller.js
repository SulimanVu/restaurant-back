const Cafe = require("../models/Cafe.model");
const Courier = require("../models/Courier.model");
const Client = require("../models/Client.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signinController = {
  signIn: async (req, res) => {
    const { mail, password } = req.body;
    try {
      let candidate;
      candidate = await Cafe.findOne({ mail });

      if (!candidate) {
        candidate = await Courier.findOne({ mail });
      }
      if (!candidate) {
        candidate = await Client.findOne({ mail });
      }
      if (!candidate) {
        return res
          .status(401)
          .json({ error: "Неверные логин или пароль (логин)" });
      }
      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res
          .status(401)
          .json({ error: "Неверные логин или пароль (пароль)" });
      }
      const payload = {
        cafeId: candidate._id,
        role: candidate.role,
      };

      token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "14d",
      });
      res.json({ token, id: candidate._id, role: candidate.role });
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  signUp: async (req, res) => {
    const { name, phone, city, address, mail, password } = req.body;
    try {
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await Client.create({
        name,
        phone,
        city,
        address,
        mail,
        password: hash,
      });
      res.json(user);
    } catch (e) {
      res.json({ error: e });
    }
  },
};
