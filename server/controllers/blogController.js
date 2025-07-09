const Blog = require("../models/blog");


// GET /api/posts - Get all blog posts (paginated, searchable, filterable)
exports.getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Search and filter
    const query = {};
    if (req.query.search) {
        query.$or = [
            { title: { $regex: req.query.search, $options: "i" } },
            { description: { $regex: req.query.search, $options: "i" } }
        ];
    }
    if (req.query.category) {
        query.category = req.query.category;
    }

    const [posts, total] = await Promise.all([
        Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("owner", "email")
            .populate("category", "name"),
        Blog.countDocuments(query)
    ]);

    res.json({
        posts,
        total,
        page,
        pages: Math.ceil(total / limit)
    });
};

// GET /api/posts/:id - Get a specific blog post
exports.getPostById = async (req, res) => {
    const post = await Blog.findById(req.params.id).populate("owner", "email").populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

// POST /api/posts - Create a new blog post
exports.createPost = async (req, res) => {
    let featuredImage = undefined;
    if (req.file) {
        featuredImage = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.create({
        ...req.body,
        owner: req.user.id,
        featuredImage
    });
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