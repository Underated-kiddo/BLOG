const express = require("express");
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/blogController");
const {protect, authorize} = require("../middleware/auth");
const { validateBlog } = require("../middleware/validators");
const router = express.Router();


// Blog post endpoints
router.get("/posts", getPosts); // public
router.get("/posts/:id", getPostById); // public
router.post("/posts", protect, validateBlog, createPost); // authenticated
router.put("/posts/:id", protect, validateBlog, updatePost); // authenticated
router.delete("/posts/:id", protect, deletePost); // authenticated

module.exports = router;