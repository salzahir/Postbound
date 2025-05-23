'use client';

import { useState } from "react";
import { FormEvent } from "react";
import Header from "../header";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmitPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setError("");
            setSuccess("");
       const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }
        const json = {title, content, isPublic};
        const res = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(json),
        });

        if (!res.ok) {
            const errorText = await res.text(); 
            console.error("Failed to create post. Status:", res.status, "Body:", errorText);
            throw new Error("Failed to create post");
        }  

        const data = await res.json();
        console.log(data);
        setSuccess("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post. Please try again.");
        }

    }

    return (
        <>
        <Header />
            <div>
            <h1>Create a New Post</h1>
            <p>Fill in the details below to create a new post.</p>
            <p>Note: You can use the form below to create a new post.</p>
            <p>Note: You can use the form below to create a new post.</p>
        </div>
        <form onSubmit={handleSubmitPost}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="content">Content</label>
            <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            Public Post
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Create Post</button>
        </form>
        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
    )
}

export default NewPost;