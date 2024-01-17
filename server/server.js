// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const Diamond = require("./models/Diamond");
const User = require("./models/User");
const Ring = require("./models/Ring");
const Necklace = require("./models/Necklace");
const Bracelet = require("./models/Bracelet");
const Earring = require("./models/Earring");
const FeaturedProduct = require("./models/FeaturedProduct");

const cors = require("cors");

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(
   process.env.MONGODB_URI || "mongodb://localhost/diamond-store",
   { useNewUrlParser: true, useUnifiedTopology: true }
);

// Middleware for parsing JSON
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
   res.send("Welcome to the Diamond Store API");
});

// Register
app.post("/api/register", async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password) {
      return res
         .status(400)
         .send({ message: "Username and password are required" });
   }

   const user = new User({ username, password });
   await user.save();
   res.status(201).send({ message: "User created" });
});

// Login
app.post("/api/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });

   if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
   }

   user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
         return res
            .status(401)
            .send({ message: "Invalid username or password" });
      }
      // You can create and send a JWT token here for authentication
      res.status(200).send({ message: "Logged in" });
   });
});

// Fetch all diamonds with optional filters
app.get("/api/diamonds", async (req, res) => {
   try {
      const {
         type,
         minCarat,
         maxCarat,
         cut,
         color,
         clarity,
         minPrice,
         maxPrice,
      } = req.query;

      const filters = {};
      if (type) filters.type = type;
      if (minCarat) filters.carat = { $gte: minCarat };
      if (maxCarat) filters.carat = { ...filters.carat, $lte: maxCarat };
      if (cut) filters.cut = cut;
      if (color) filters.color = color;
      if (clarity) filters.clarity = clarity;
      if (minPrice) filters.price = { $gte: minPrice };
      if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice };

      const diamonds = await Diamond.find(filters);
      res.status(200).send(diamonds);
   } catch (error) {
      res.status(500).send({ message: "Error fetching diamonds" });
   }
});

app.post("/api/diamonds", async (req, res) => {
   const { name, carat, price } = req.body;
   const diamond = new Diamond({ name, carat, price });
   await diamond.save();
   res.status(201).send(diamond);
});

// Fetch diamonds by shape
app.get("/api/diamonds/shape/:shape", async (req, res) => {
   try {
      const shape = req.params.shape;
      const diamonds = await Diamond.find({ type: shape });
      res.status(200).send(diamonds);
   } catch (error) {
      res.status(500).send({ message: "Error fetching diamonds by shape" });
   }
});

// Get all rings
app.get("/api/rings", async (req, res) => {
   try {
      const rings = await Ring.find();
      res.status(200).send(rings);
   } catch (error) {
      res.status(500).send({ message: "Error fetching rings" });
   }
});

// Get all necklaces
app.get("/api/necklaces", async (req, res) => {
   const necklaces = await Necklace.find();
   res.json(necklaces);
});

// Get all bracelets
app.get("/api/bracelets", async (req, res) => {
   const bracelets = await Bracelet.find();
   res.json(bracelets);
});

// Get all earrings
app.get("/api/earrings", async (req, res) => {
   const earrings = await Earring.find();
   res.json(earrings);
});

// Get all specials
app.get("/api/specials", async (req, res) => {
   try {
      const featuredProducts = await FeaturedProduct.find();
      res.status(200).send(featuredProducts);
   } catch (error) {
      res.status(500).send({ message: "Error fetching featured products" });
   }
});

// get an individual product
app.get("/api/:category/:productId", async (req, res) => {
   const { category, productId } = req.params;
   let model;

   switch (category) {
      case "diamonds":
         model = Diamond; // Add this case to handle diamonds
         break;
      case "rings":
         model = Ring;
         break;
      case "necklaces":
         model = Necklace;
         break;
      case "bracelets":
         model = Bracelet;
         break;
      case "earrings":
         model = Earring;
         break;
      default:
         return res.status(404).send({ message: "Category not found" });
   }

   try {
      const product = await model.findById(productId);
      if (!product) {
         return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send(product);
   } catch (error) {
      res.status(500).send({ message: "Error fetching product" });
   }
});

// Listen on port 6000
const port = process.env.PORT || 6000;
app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});
