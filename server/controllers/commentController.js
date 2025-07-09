const Comment = require("../models/comment");
const Blog = require("../models/blog");

// Get comments for a post
exports.getComments = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId })
        .populate("user", "email")
        .sort({ createdAt: -1 });
    res.json(comments);
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });
    const comment = await Comment.create({
        post: req.params.postId,
        user: req.user.id,
        text
    });
    await comment.populate("user", "email");
    res.status(201).json(comment);
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
};
