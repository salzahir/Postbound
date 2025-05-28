import { useEffect, useState, FormEvent } from "react";
import { Comment } from "@/types/comments";
import { getApiUrl } from "@/app/services/api";

function useComments(postId: string, token: string | null, userId: string | null, setError: (error: string) => void) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

        useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await fetch(getApiUrl(`/comments/post/${postId}`));
                const comments = await data.json();
                setComments(comments);
                setCommentLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setCommentError("Failed to fetch comments");
                setCommentLoading(false);
            }
        }
        fetchComments();
    }, [postId]);

    async function postComment(event: FormEvent<HTMLFormElement>) {
        setError("")
        setMessage("")
        setCommentError("")
        event.preventDefault();
        const json = {
            title: commentTitle,
            content: commentContent,
            postId: Number(postId),
            userId: userId || "",
        };
        try {
            const res = await fetch(getApiUrl(`/comments/post/${postId}`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(json),
            });
            const data = await res.json();
            if (!res.ok) {
                setCommentError(data.message || "Failed to post comment");
                return;
            }
            setComments((prevComments) => [...prevComments, data]);
            setMessage("Comment posted successfully!");
            setCommentLoading(false);
        } catch (error) {
            console.error("Error posting comment:", error);
            setCommentError("Failed to post comment");
        }
    }

    async function deleteComment(id: number) {
        try {
            const res = await fetch(getApiUrl(`/comments/${id}`), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                setCommentError(data.message || "Failed to delete comment");
                return;
            }
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
            setMessage("Comment deleted successfully!");
        } catch (error) {
            console.error("Error deleting comment:", error);
            setCommentError("Failed to delete comment");
        }
    }

    return {
        comments,
        commentTitle,
        setCommentTitle,
        commentContent,
        setCommentContent,
        commentLoading,
        commentError,
        message,
        postComment,
        deleteComment,
    };
}

export default useComments;