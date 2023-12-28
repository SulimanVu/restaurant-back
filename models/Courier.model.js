const mongoose = require("mongoose");

const courierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: "courier"
  }
});

const Courier = mongoose.model("Courier", courierSchema);

module.exports = Courier;
