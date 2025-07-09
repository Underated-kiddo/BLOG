const Blog = require("../models/blog");


// GET /api/posts - Get all blog posts
exports.getPosts = async (req, res) => {
    const posts = await Blog.find().populate("owner", "email").populate("category", "name");
    res.json(posts);
};

// GET /api/posts/:id - Get a specific blog post
exports.getPostById = async (req, res) => {
    const post = await Blog.findById(req.params.id).populate("owner", "email").populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

// POST /api/posts - Create a new blog post
exports.createPost = async (req, res) => {
    const blog = await Blog.create({ ...req.body, owner: req.user.id });
    await blog.populate("owner", "email");
    await blog.populate("category", "name");
    res.status(201).json(blog);
};

// PUT /api/posts/:id - Update an existing blog post
exports.updatePost = async (req, res) => {
    const post = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate("owner", "email").populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

// DELETE /api/posts/:id - Delete a blog post
exports.deletePost = async (req, res) => {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
};