"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm from "@/app/newpost/postform";
import Header from "@/app/header";
import { fetchPostById } from "../../postview/fetchpostid";
import { useRouter } from "next/navigation";
import { getApiUrl } from '../../utils/api';

function EditPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

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
            const res = await fetch(getApiUrl(`/posts/${id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(json)
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Failed to update post. Status:", res.status, "Body:", errorText);
                throw new Error("Failed to update post");
            }
            const data = await res.json();
            console.log(data);
            setSuccess("Post updated successfully!");
            setTimeout(() => {
                router.push("/posts");
            }, 2000);
        } catch (error) {
            console.error("Error updating post:", error);
            setError("Failed to update post. Please try again.");
        }
    }

    async function handleDeletePost() {
        try {
            setError("");
            setSuccess("");
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const res = await fetch(getApiUrl(`/posts/${id}`), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error("Failed to delete post");
            }
            setSuccess("Post deleted successfully!");
            setTimeout(() => {
                router.push("/posts");
            }, 2000);
        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete post. Please try again.");
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-3xl font-bold text-white mb-6">Edit Post</h1>
                <PostForm
                    onSubmit={handleUpdatePost}
                    title={title}
                    content={content}
                    isPublic={isPublic}
                    setTitle={setTitle}
                    setContent={setContent}
                    setIsPublic={setIsPublic}
                    submitLabel="Update Post"
                    error={error}
                    success={success}
                />
                <button
                    onClick={handleDeletePost}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Delete Post
                </button>
            </div>
        </>
    );
}

export default EditPost;