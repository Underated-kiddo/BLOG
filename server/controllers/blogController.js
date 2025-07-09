const  Blog = require("../models/blog");

//POST /api/blogs
exports.createBlog = async (req,res) =>{
    const blog = await Blog.create({ ...req.bode , owner: req.user.id});
    res.json(blog);
};

//GET /api/blogs/me
exports.getMyBlogs = async (req,res) =>{
    const blogs = await Blog.find({owner: req.user.id});
    res.json(blogs);
};

//GET /api/blogs/all
exports.getAllBlogs = async (req,res) => {
    const blogs = await Blog.find().populate("owner", "email");
    res.json(blogs);
}; 