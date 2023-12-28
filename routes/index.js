const { Router } = require("express");

const router = Router();

router.use("/cafe", require("./cafe.route"));
router.use("/carts", require("./cart.route"));
router.use("/food", require("./food.route"));
router.use("/categories", require("./category.route"));
router.use("/orders", require("./order.route"));
router.use("/clients", require("./client.route"));
router.use("/couriers", require("./courier.route"));

// роуты чата
router.use(require("./conversation.route"));
router.use(require("./messages.route"));

router.use(require("./signin.route"));

module.exports = router;
