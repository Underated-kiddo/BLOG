import {Dialog , DialogTrigger, DialogContent,DialogHeader,DialogTitle , DialogFooter,DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCategories from "../lib/useCategories";

export default function BlogDialog({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);
    const { categories, loading: catLoading, error: catError } = useCategories();

    const handleCreate = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        if (featuredImage) {
            formData.append("featuredImage", featuredImage);
        }
        onSubmit(formData);
        setTitle("");
        setDescription("");
        setCategory("");
        setFeaturedImage(null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Post Blog</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Blog Post</DialogTitle>
                </DialogHeader>

                <Input placeholder="Blog Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Textarea
                    placeholder="Description"
                    className="mt-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <select
                    className="mt-2 w-full border rounded p-2"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    disabled={catLoading}
                >
                    <option value="">{catLoading ? "Loading categories..." : "Select category"}</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                {catError && <div className="text-red-500 text-sm mt-1">{catError}</div>}

                <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={e => setFeaturedImage(e.target.files[0])}
                />
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreate}>Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

