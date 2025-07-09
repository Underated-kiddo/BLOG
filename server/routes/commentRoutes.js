const express = require("express");
const { protect } = require("../middleware/auth");
const { getComments, addComment, deleteComment } = require("../controllers/commentController");
const router = express.Router();

// Get all comments for a post
router.get("/posts/:postId/comments", getComments);
// Add a comment to a post
router.post("/posts/:postId/comments", protect, addComment);
// Delete a comment
router.delete("/comments/:commentId", protect, deleteComment);

module.exports = router;
