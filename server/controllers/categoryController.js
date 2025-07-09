const Category = require("../models/category");

// GET /api/categories - Get all categories
exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

// POST /api/categories - Create a new category
exports.createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
};
