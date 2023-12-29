const { Router } = require("express");
const { stripeController } = require("../controllers/stripe.controller");


const router = Router();

router.post("/", stripeController.pay);

module.exports = router;
