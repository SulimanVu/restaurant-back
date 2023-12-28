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
  courierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courier",
  },
  // Пока как идея проверки принятия или отклонения заказа
 
  //-------------------------------------------------------
  total: Number,
  from: String,
  to: String,
  status: String,
  recievedAt: String
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
