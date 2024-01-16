const mongoose = require("mongoose");

const BraceletSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
});

const Bracelet = mongoose.model("Bracelet", BraceletSchema);

module.exports = Bracelet;
