import { useEffect, useState } from "react";
import API from "../services/api";

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchCategories() {
        try {
        const res = await API.get("/categories");
        setCategories(res.data);
    } catch {
        setError("Failed to load categories");
    } finally {
        setLoading(false);
    }
    }
    fetchCategories();
}, []);

return { categories, loading, error };
}
