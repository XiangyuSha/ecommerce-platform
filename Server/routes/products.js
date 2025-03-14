const express = require("express");
const { executeQuery } = require("../models/db");
const { verifyToken } = require("../middlewares/authJWT");
const { authorizeRoles } = require("../middlewares/authRBAC");

const router = express.Router();

/** Get All Products (Public) */
router.get("/products", async (req, res) => {
  try {
    const products = await executeQuery("SELECT * FROM Products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Update inventory（only Staff or Admin）
router.put("/products/:id", verifyToken, authorizeRoles(2, 3), async (req, res) => {
  const { stock_quantity } = req.body;
  const productId = req.params.id;

  try {
    const result = await executeQuery(
      "UPDATE Products SET stock_quantity = ? WHERE id = ?",
      [stock_quantity, productId]
    );

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Database error" });
  }
});

/** Add a New Product (Staff and admin) */
router.post("/products", verifyToken, authorizeRoles(2, 3), async (req, res) => {
  const { name, price, stock_quantity, image_url } = req.body;

  try {
    await executeQuery(
      "INSERT INTO Products (name, price, stock_quantity, image_url) VALUES (?, ?, ?, ?)",
      [
        name,
        price,
        stock_quantity || 0, // Default to 0 if not provided
        image_url ||
          "https://static.vecteezy.com/system/resources/previews/002/186/712/non_2x/new-product-tag-sticker-free-vector.jpg",
      ]
    );
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: err.message });
  }
});

/** Delete a Product (Only Admin, Role_id = 2) */
router.delete("/products/:id", verifyToken, authorizeRoles(2), async (req, res) => {
  try {
    const result = await executeQuery("DELETE FROM Products WHERE id = ?", [
      req.params.id,
    ]);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;