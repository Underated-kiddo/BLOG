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

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Blog post endpoints
router.get("/posts", getPosts); // public
router.get("/posts/:id", getPostById); // public
router.post("/posts", protect, upload.single("featuredImage"), validateBlog, createPost); // authenticated
router.put("/posts/:id", protect, validateBlog, updatePost); // authenticated
router.delete("/posts/:id", protect, deletePost); // authenticated

module.exports = router;