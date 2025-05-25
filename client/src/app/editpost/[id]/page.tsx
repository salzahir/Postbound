"use client"
import { Post } from "@/types/posts"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm from "@/app/newpost/postform";
import Header from "@/app/header";
import { fetchPostById } from "../../postview/fetchpostid";

function EditPost({}: {post: Post}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useParams();
    const id = params.id as string;
    
    useEffect(() => {
        async function loadPost() {
            try {
                const data = await fetchPostById(id);
                setTitle(data.title);
                setContent(data.content);
                setIsPublic(data.isPublic);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
    } loadPost();
    }, [id]);


    async function handleUpdatePost(event: React.FormEvent<HTMLFormElement>) {
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
            const res = await fetch(`http://localhost:3001/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(json),
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Failed to update post. Status:", res.status, "Body:", errorText);
                throw new Error("Failed to update post");
            }
            const data = await res.json();
            console.log(data);
            setSuccess("Post updated successfully!");
        } catch (error) {
            console.error("Error updating post:", error);
            setError("Failed to update post. Please try again.");
        }
    }

    return (
        <>
            <Header/>
            <h1>Edit Your Post</h1>
            <PostForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                onSubmit={handleUpdatePost}
                error={error}
                success={success}
                submitLabel="Edit Post"
            />
        </>
    )
}

export default EditPost;