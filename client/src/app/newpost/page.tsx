'use client';

import { useState } from "react";
import { FormEvent } from "react";
import Header from "@/app/components/layout/Header";
import PostForm from "./PostForm";
import useApi from "../hooks/useApi";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [success, setSuccess] = useState("");
    const {fetchData, error, isApiDown} = useApi("POST", true);

    async function handleSubmitPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const json = { title, content, isPublic };
            await fetchData("/posts",json);
            setSuccess("Post created successfully!");
            setTitle("");
            setContent("");
            setIsPublic(false);
        } catch (error) {
            console.error("Error creating post:", error);
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
                    error={error || ""}
                    success={success}
                    isApiDown={isApiDown}
                />
            </div>
        </>
    );
}

export default NewPost;