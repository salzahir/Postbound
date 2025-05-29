import { Comment } from "@/types/comments";
import { useState } from "react";
import useApi from "../hooks/useApi";

interface UpdateCommentProps {
    comment: Comment;
    onUpdate: () => void;
    onCancel: () => void;
}

export default function UpdateComment({ comment, onUpdate, onCancel }: UpdateCommentProps) {
    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);
    const {fetchData, error, loading} = useApi("PUT", true);

    function isFormInvalid() {
        return loading || 
               !title.trim() || 
               !content.trim() || 
               title.length < 3 || 
               title.length > 50 || 
               content.length < 5;
    }

    async function updateComment() {
        const data = await fetchData(`/comments/${comment.id}`, { title, content });
        if (data !== null) {
            onUpdate();
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comment title (3-50 characters)"
                minLength={3}
                maxLength={50}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comment content (minimum 5 characters)"
                minLength={5}
            />
            <div className="flex gap-2">
                <button
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={updateComment}
                    disabled={isFormInvalid()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Comment"}
                </button>
            </div>
            {loading && <p className="text-gray-400">Updating comment...</p>}
            {error && <p className="text-red-400">Error: {error}</p>}
            <div className="text-sm text-gray-400">
                <p>Title must be between 3 and 50 characters</p>
                <p>Content must be at least 5 characters long</p>
            </div>
        </div>
    );
}
