const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  foods: [{foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  count: {
    type: Number,
    default: 1
  }}],
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cafe"
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
