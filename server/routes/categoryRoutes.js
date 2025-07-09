const express = require("express");
const { getCategories, createCategory } = require("../controllers/categoryController");
const { protect } = require("../middleware/auth");
const { validateCategory } = require("../middleware/validators");
const Category = require("../models/category");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
});

// Create a new category
router.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const category = await Category.create({ name });
    res.status(201).json(category);
});

module.exports = router;
