import { Comment } from "@/types/comments";
import React, { useState } from "react";
function UpdateComment({comment, token}: {comment: Comment, token: string}) {

    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);

    async function updateComment() {
        try {
            const json = { title, content };
            const res = await fetch(`http://localhost:3001/comments/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(json),
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Failed to update comment. Status:", res.status, "Body:", errorText);
                throw new Error("Failed to update comment");
            }
            const data = await res.json();
            console.log("Comment updated successfully:", data);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    }

    if (!comment || !token) {
        return <p>Comment or token is missing</p>;
    }

    return (
        <form onSubmit={updateComment} className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
            <label htmlFor="title" className="text-sm font-semibold text-white">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <label htmlFor="content" className="text-sm font-semibold text-white">Content</label>
            <textarea
                name="content"
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            ></textarea>
            <button type="submit">Update Comment</button>
        </form>
    );
}

export default UpdateComment;