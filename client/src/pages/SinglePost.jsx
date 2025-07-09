import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);

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

    useEffect(() => {
        async function fetchComments() {
            try {
                const res = await API.get(`/posts/${id}/comments`);
                setComments(res.data);
            } catch {
                setComments([]);
            }
        }
        fetchComments();
    }, [id]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        setCommentLoading(true);
        try {
            const res = await API.post(`/posts/${id}/comments`, { text: commentText });
            setComments(prev => [res.data, ...prev]);
            setCommentText("");
        } catch {
            // Optionally show error
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="single-post max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="mb-2">{post.description}</p>
            <div className="text-sm text-gray-500 mb-2">By {post.owner?.email || "Unknown"}</div>
            <div className="text-xs text-gray-400 mb-4">{new Date(post.createdAt).toLocaleString()}</div>

            <hr className="my-4" />
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <div className="mb-4">
                <textarea
                    className="w-full border rounded p-2 mb-2"
                    rows={2}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    disabled={commentLoading}
                />
                <button
                    className="px-4 py-1 bg-blue-500 text-white rounded"
                    onClick={handleAddComment}
                    disabled={commentLoading || !commentText.trim()}
                >
                    {commentLoading ? "Posting..." : "Post Comment"}
                </button>
            </div>
            <div>
                {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
                {comments.map(c => (
                    <div key={c._id} className="border-b py-2">
                        <div className="text-sm font-semibold">{c.user?.email || "User"}</div>
                        <div className="text-base">{c.text}</div>
                        <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
