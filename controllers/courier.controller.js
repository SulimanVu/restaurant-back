const Courier = require("../models/Courier.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.courierController = {
    getAllCouriers: async (req, res) => {
        try {
            const responce = await Courier.find();
            res.status(200).json(responce);
        } catch (e) {
            res.status(400).json({ error: e.toString() });
        }
    },
    editCourier: async (req, res) => {
        const { name, phone, mail, city } = req.body;
        try {
            const editedCourier = await Courier.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    phone,
                    mail,
                    city,
                }
            );
        } catch (e) {
            res.json({ error: e.toString() });
        }
    },
    deleteCourier: async (req, res) => {
        try {
            await Courier.findByIdAndDelete(req.params.id);
            res.status(200).json("Курьер удален");
        } catch (e) {
            res.json({ error: e.toString() });
        }
    },
    signUpCourier: async (req, res) => {
        const { name, phone, city, mail, password } = req.body;
        const hash = await bcrypt.hash(
            password,
            Number(process.env.BCRYPT_ROUNDS)
        );
        try {
            await Courier.create({
                name,
                phone,
                city,
                mail,
                password: hash,
            });
            res.status(200).json("Курьер создан");
        } catch (e) {
            res.status(400).json({ error: e.toString() });
        }
    },
    getCourierByToken: async (req, res) => {
      const courierId = req.user.cafeId
      try {
        const courierCurrent = await Courier.findById(courierId);
        res.json(courierCurrent);
      } catch (e) {
        res.json({error: e.toString()})
      }
    }
    // signIn: async (req, res) => {
    //   const { mail, password } = req.body;
    //   try {
    //     const candidate = await Courier.findOne({ mail });

    //     if (!candidate) {
    //       return res
    //         .status(401)
    //         .json({ error: "Неверные логин или пароль (логин)" });
    //     }
    //     const valid = await bcrypt.compare(password, candidate.password);

    //     if (!valid) {
    //       return res
    //         .status(401)
    //         .json({ error: "Неверные логин или пароль (пароль)" });
    //     }
    //     const payload = {
    //       courierId: candidate._id,
    //       role: candidate.role
    //     };
    //     token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
    //       expiresIn: "14d"
    //     });
    //     res.json({ token });
    //   } catch (e) {
    //     res.json({ error: e.toString() });
    //   }
    // }
};
