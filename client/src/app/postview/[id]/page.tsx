"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "../../header";
import { Post } from "../../../types/posts";

function PostView() {
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await fetch(`http://localhost:3001/posts/${id}`)
                const post = await data.json();
                setPost(post);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Failed to fetch post");
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!post) {
        return <div>Post not found</div>;
    }
    return (
        <>
            <Header />
            <div>PostView
                <p>{post.title}</p>
                <p>{post.content}</p>
                <p>{post.createdAt}</p>
                <p>{post.updatedAt}</p>
                <p>{post.isPublic}</p>
            </div>

            <div>
                <h1>Comments</h1>

            </div>
        </>
    )
    
}

export default PostView;