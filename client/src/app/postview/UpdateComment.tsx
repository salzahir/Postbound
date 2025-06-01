import { Comment } from "@/types/comments";
import { useState } from "react";
import useApi from "../hooks/useApi";
import ApiError from "../components/error/ApiError";

interface UpdateCommentProps {
    comment: Comment;
    onUpdate: () => void;
    onCancel: () => void;
}

export default function UpdateComment({ comment, onUpdate, onCancel }: UpdateCommentProps) {
    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);
    const {fetchData, error, loading, isApiDown} = useApi("PUT", true);

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
            {error && <ApiError message={error} isApiDown={isApiDown} />}
            <div className="flex gap-2">
                <button
                    onClick={updateComment}
                    disabled={isFormInvalid()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Update
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
