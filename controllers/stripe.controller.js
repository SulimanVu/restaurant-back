const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OSTm3FFTxEkT9XGKOda48tQcYHdFrtIQy6EE52I50EBxwhY60nQQc0E3ko64tOsqDUP7JHc41u4f2sGt6eh9iz500OxraP7jn"
);

module.exports.stripeController = {
  pay: async (req, res) => {
    try {
      const amount = 2000;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
        metadata: {
          name: "value",
        },
      });
      const clientSecret = paymentIntent.client_secret;
      console.log(clientSecret, 'clientSecret')
      res.json({ clientSecret, message: "Payment Initiated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
