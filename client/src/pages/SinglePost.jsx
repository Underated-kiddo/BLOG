import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchPost() {
        try {
        const res = await API.get(`/blogs/${id}`);
        setPost(res.data);
    } catch {
        setError("Failed to load post");
    } finally {
        setLoading(false);
    }
    }
    fetchPost();
}, [id]);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
if (!post) return <div>Post not found</div>;

return (
    <div className="single-post">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div>By {post.author?.name || "Unknown"}</div>
        <div>{new Date(post.createdAt).toLocaleString()}</div>
    </div>
    );
}
