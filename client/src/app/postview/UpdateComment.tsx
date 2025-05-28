import { Comment } from "@/types/comments";
import { useState } from "react";
import useApi from "../hooks/useApi";


function UpdateComment({comment}: {comment: Comment}) {
    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);
    const {fetchData, error, loading} = useApi(`/comments/${comment.id}`, "PUT", true);

    async function updateComment() {
        try {
            await fetchData({title, content});
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
            {loading ? "Updating..." : "Update Comment"}                
            </button>
            {loading && <p className="text-gray-400">Updating comment...</p>}
            {error && <p className="text-red-400">Error: {error}</p>}
        </div>
    );
}

export default UpdateComment;