import { useEffect , useState } from "react";
import API from "../services/api";
import BlogCard from "@/components/BlogCard";
import BlogDialog from "@/components/BlogDialog";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    // Load categories for filter dropdown
    useEffect(() => {
        API.get("/categories").then(res => setCategories(res.data));
    }, []);

    const load = async (pageNum = 1, searchVal = search, catVal = category) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("page", pageNum);
            params.append("limit", 6);
            if (searchVal) params.append("search", searchVal);
            if (catVal) params.append("category", catVal);
            const res = await API.get(`/posts?${params.toString()}`);
            setBlogs(res.data.posts);
            setTotalPages(res.data.pages);
            setPage(res.data.page);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(page); }, [page]);

    // Optimistic UI update for creating a blog
    const createBlog = async (formData) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        const optimisticBlog = { _id: tempId, posted: false };
        setBlogs(prev => [optimisticBlog, ...prev]);
        try {
            const res = await API.post("/posts", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setBlogs(prev => prev.map(b => b._id === tempId ? res.data : b));
            toast("Blog created");
        } catch {
            setBlogs(prev => prev.filter(b => b._id !== tempId));
            toast("Failed to create blog", { style: { background: 'red', color: 'white' } });
        }
    };

    const toggleBlog = async (id) =>{
        const blog = blogs.find(b => b._id ===id);
        const res = await API.put(`/posts/${id}`, {completed: !blog.completed});
        setBlogs(prev => prev.map(b => (b._id === id ? res.data : b)));
    };

    const deleteBlog = async (id) => {
        await API.delete(`/posts/${id}`);
        setBlogs(prev => prev.filter(b => b._id !== id));
        toast ("Blog deleted");
    };

    return(
        <>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Blogs</h1>
                <BlogDialog onSubmit={createBlog} />
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="border rounded px-2 py-1"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="border rounded px-2 py-1"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <button
                    className="px-3 py-1 rounded border bg-blue-500 text-white"
                    onClick={() => load(1, search, category)}
                >
                    Search
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 ">
                    {blogs.map(b => (
                        <BlogCard
                            key={b._id}
                            blog={b}
                            onToggle={toggleBlog}
                            onDelete={deleteBlog}
                        />
                    ))}
                </section>
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="px-3 py-1 rounded border"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        className="px-3 py-1 rounded border"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
                </>
            )}
        </main>
        </>
    );
}
