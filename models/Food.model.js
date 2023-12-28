const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "files\\defaultfood.jpg",
  },
  info: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
  price: {
    type: Number,
    reqiured: true,
  },
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe'
  }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
