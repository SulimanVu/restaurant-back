const Cafe = require("../models/Cafe.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.cafeController = {
  getAllCafe: async (req, res) => {
    try {
      const allCafe = await Cafe.find();
      res.status(200).json(allCafe);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  deleteCafe: async (req, res) => {
    try {
      await Cafe.findByIdAndDelete(req.params.id);
      res.status(200).json("Кафе удалено");
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getOneCafeById: async (req, res) => {
    try {
      const oneCafe = await Cafe.findById(req.params.id);
      res.status(200).json(oneCafe);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  signUpCafe: async (req, res) => {
    const { name, phone, city, address, mail, password } = req.body;
        const hash = await bcrypt.hash(
            password,
            Number(process.env.BCRYPT_ROUNDS)
        );
        try {
            await Cafe.create({
                name,
                phone,
                city,
                address,
                mail,
                password: hash,
            });
            res.status(200).json("Кафе создано");
        } catch (e) {
            console.log("Ошибка");
            res.status(400).json({ error: e.toString() });
        }
    },
    editCafe: async (req, res) => {
        const cafeId = req.params.id;
        console.log(req.body);
        try {
            const currentCafe = await Cafe.find({ cafeId })
            const sdf = await Cafe.findById(cafeId)
            console.log(sdf)

            const editedCafe = await Cafe.findByIdAndUpdate(cafeId,
                {
                    $push: {
                        orders: [req.body]
                    },
                    image: req.file ? req.file.path : currentCafe.image
                }, { new: true });
            res.json(editedCafe);
        } catch (e) {
            res.json({ error: e.toString() })
        }
    },
    getCafeByToken: async (req, res) => {
        const cafeId = req.user.cafeId;
        try {
            const cafeCurrent = await Cafe.findById(cafeId);
            res.json(cafeCurrent);
        } catch (e) {
            res.json({ error: e.toString() })
        }

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
    try {
      await Cafe.create({
        name,
        phone,
        city,
        address,
        mail,
        password: hash,
      });
      res.status(200).json("Кафе создано");
    } catch (e) {
      console.log("Ошибка");
      res.status(400).json({ error: e.toString() });
    }
  },
  editCafe: async (req, res) => {
    const { id } = req.params.id;
    try {
      const editedCafe = await Cafe.findByIdAndUpdate(id, {
        ...req.body,
        image: req.file ? req.file.path : currentCafe.image,
      });
      res.json(editedCafe);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getCafeByToken: async (req, res) => {
    const cafeId = req.user.cafeId;
    try {
      const cafeCurrent = await Cafe.findById(cafeId);
      res.json(cafeCurrent);
    } catch (e) {
      res.json({ error: e.toString() });

    }
  },
};
