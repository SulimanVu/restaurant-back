const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cafe",
  },
  total: Number,
  status: String,
  recievedAt: String
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
