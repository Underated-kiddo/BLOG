const express = require("express");
const { getCategories, createCategory } = require("../controllers/categoryController");
const { protect } = require("../middleware/auth");
const { validateCategory } = require("../middleware/validators");
const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Create a new category (only via Postman or API clients, not from frontend forms)
router.post(
    "/",
    (req, res, next) => {
    // Check for a custom header to allow only API clients like Postman
    const apiClient = req.get("x-api-client");
    if (apiClient !== "postman") {
        return res.status(403).json({ message: "Category creation allowed only via Postman or API client." });
    }
    next();
},
validateCategory,
createCategory
);

module.exports = router;
