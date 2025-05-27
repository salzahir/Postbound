import { Comment } from "@/types/comments";
import React, { useState } from "react";
import { getApiUrl } from '../services/api';

function UpdateComment({comment, token}: {comment: Comment, token: string}) {
    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);
    
    async function updateComment() {
        try {
            const json = { title, content };
            const res = await fetch(getApiUrl(`/comments/${comment.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(json)
            });
            if (!res.ok) {
                throw new Error("Failed to update comment");
            }
            window.location.reload();
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={updateComment}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Update Comment
            </button>
        </div>
    );
}

export default UpdateComment;