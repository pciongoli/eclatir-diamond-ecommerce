const mongoose = require("mongoose");

const FeaturedProductSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   carat: {
      type: Number,
      required: false,
   },
   cut: {
      type: String,
      enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
      required: false,
   },
   color: {
      type: String,
      required: false,
   },
   clarity: {
      type: String,
      required: false,
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
   },
   isFeatured: {
      type: Boolean,
      default: true,
   },
});

const FeaturedProduct = mongoose.model(
   "FeaturedProduct",
   FeaturedProductSchema
);

module.exports = FeaturedProduct;
