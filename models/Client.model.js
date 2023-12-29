const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: "client",
  },
  basket: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Food",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
