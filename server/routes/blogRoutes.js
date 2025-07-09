const express = require("express");
const {createBlog, getMyBlogs, getAllBlogs } = require("../controllers/blogController");
const {protect, authorize} = require("../middleware/auth");
const router = express.Router();

router.post("/", protect , createBlog);
router.get("/me", protect, getMyBlogs)
router.get("/all", protect , authorize(["Admin"]) , getAllBlogs);

module.exports = router;