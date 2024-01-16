const mongoose = require("mongoose");

const EarringSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Earring", EarringSchema);
