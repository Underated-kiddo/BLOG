import { useState, useCallback } from "react";
import API from "../services/api";

export default function useApi({ method = "get", url, body = null, options = {} }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (override = {}) => {
    setLoading(true);
    setError(null);
    try {
        const res = await API[override.method || method](override.url || url, override.body || body, override.options || options);
        setData(res.data);
        return res.data;
    } catch (err) {
        setError(err);
        throw err;
    } finally {
        setLoading(false);
    }
}, [method, url, body, options]);

return { data, loading, error, execute };
}
