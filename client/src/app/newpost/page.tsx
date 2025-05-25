'use client';

import { useState } from "react";
import { FormEvent } from "react";
import Header from "../header";
import PostForm from "./postform";

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

            <PostForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                onSubmit={handleSubmitPost}
                error={error}
                success={success}
                submitLabel="Create Post"
            />
        </>
    );
}

export default NewPost;