const mongoose = require("mongoose");

const orderedSchema = mongoose.Schema({
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

const Ordered = mongoose.model("Ordered", orderedSchema);

module.exports = Ordered;
