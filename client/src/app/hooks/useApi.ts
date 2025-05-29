import { useState, useCallback } from "react";
import { getApiUrl } from "../services/api";

type RequestBody = Record<string, unknown>;

function useApi(endpoint: string, requiresAuth: boolean) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (method: string, body?: RequestBody) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            
            if (requiresAuth && token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(getApiUrl(endpoint), { 
                method, 
                headers,
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Request failed");
            }
            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    }, [endpoint, requiresAuth]);

    return { fetchData, loading, error };
}

export default useApi;