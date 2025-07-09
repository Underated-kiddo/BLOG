const express = require("express");
const { getCategories, createCategory } = require("../controllers/categoryController");
const { protect } = require("../middleware/auth");
const { validateCategory } = require("../middleware/validators");
const router = express.Router();

router.get("/categories", getCategories); // public
router.post("/categories", protect, validateCategory, createCategory); // authenticated

module.exports = router;
