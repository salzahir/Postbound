"use client";
import Header from "../header";
import PostCard from "./PostCard";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";

function Posts() {
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const[token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                }
                const fetchedPosts = await fetch("http://localhost:3001/posts");
                const data = await fetchedPosts.json() as Post[];
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts");
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    if(posts.length === 0) {
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
                          <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Posts; 