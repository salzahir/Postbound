"use client";
import Header from "../components/layout/Header";
import PostCard from "./PostCard";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";
import { User } from "@/types/users";
import useApi from "../hooks/useApi";

function Posts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const {fetchData, error, loading} = useApi("GET", false);
    const {fetchData: checkAuth} = useApi("GET", true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await fetchData("/posts");
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
                setToken(null);}
        };
        fetchPosts();
    }, [fetchData]);

    useEffect(() => {
        async function checkAuthor() {
            try {
                const data = await checkAuth("/auth/login");
                setUser(data);
                console.log("User data:", data);
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        } checkAuthor();
    }, [checkAuth]);

    if (posts.length === 0) {
        return (
            <>
                <Header />
                <div>
                    <h1>No posts available</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <main>
                <h1>Posts</h1>
                <p>{token ? "You are logged in" : "You are not logged in"}</p>
                <div>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} isAuthor={!!user?.isAuthor} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Posts; 