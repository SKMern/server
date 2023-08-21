const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../Mongo-Model/productModel");

// Middleware to verify the access token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  });
};

// Get all products
router.get("/", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a product
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    res.status(201).json({ message: "Product created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a product
router.put("/:productId", authenticateToken, async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { name, price, description },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a product
router.delete("/:productId", authenticateToken, async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.productId);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
