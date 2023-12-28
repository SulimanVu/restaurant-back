const mongoose = require("mongoose");

const cafeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "files\\defaultcafe.jpg",
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: "cafe"
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }
  ]
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;
