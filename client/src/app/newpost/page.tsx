'use client';

import { useState } from "react";
import { FormEvent } from "react";
import Header from "../components/layout/header";
import PostForm from "./postform";
import { getApiUrl } from '../services/api';

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
            const json = { title, content, isPublic };
            const res = await fetch(getApiUrl("/posts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(json)
            });
            if (!res.ok) {
                throw new Error("Failed to create post");
            }
            setSuccess("Post created successfully!");
            setTitle("");
            setContent("");
            setIsPublic(false);
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post. Please try again.");
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-3xl font-bold text-white mb-6">Create New Post</h1>
                <PostForm
                    onSubmit={handleSubmitPost}
                    title={title}
                    content={content}
                    isPublic={isPublic}
                    setTitle={setTitle}
                    setContent={setContent}
                    setIsPublic={setIsPublic}
                    submitLabel="Create Post"
                    error={error}
                    success={success}
                />
            </div>
        </>
    );
}

export default NewPost;