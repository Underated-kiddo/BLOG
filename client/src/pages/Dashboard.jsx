import { useEffect , useState } from "react";
import API from "../services/api"
import BlogCard from "@/components/BlogCard";
import BlogDialog from "@/components/BlogDialog";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function Dashboard() {
    const [blogs,setBlogs] = useState([]);

    const load = async () => {
        const res = await API.get("/blogs/me");
        setBlogs(res.data);
    };

    useEffect(()  => {load();} , [] );

    // Optimistic UI update for creating a blog
    const createBlog = async (payload) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        const optimisticBlog = { ...payload, _id: tempId, posted: false };
        setBlogs(prev => [optimisticBlog, ...prev]);
        try {
            const res = await API.post("/blogs", payload);
            setBlogs(prev => prev.map(b => b._id === tempId ? res.data : b));
            toast("Blog created");
        } catch {
            setBlogs(prev => prev.filter(b => b._id !== tempId));
            toast("Failed to create blog", { style: { background: 'red', color: 'white' } });
        }
    };

    const toggleBlog = async (id) =>{
        const blog = blogs.find(b => b.id ===id);
        const res = await API.put(`/blogs/${id}`, {completed: !blog.completed});
        setBlogs(prev => prev.map(b => (b._id === id ? res.data : b)));
    };

    const deleteBlog = async (id) => {
        await API.delete(`/blogs/${id}`);
        setBlogs(prev => prev.filter(b => b._id !== id));
        toast ("Blog deleted");
    };

    return(
        <>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Blogs</h1>
                <BlogDialog onSubmit={createBlog} />
            </div>

            <section 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 "
            >
            {blogs.map( b => (
                <BlogCard 
                key={b._id}
                blog={b}
                onToggle={toggleBlog}
                onDelete= {deleteBlog} 
                />
            ))}
            </section>
        </main>
        </>
    ); 
}
