import { useEffect, useState, FormEvent } from "react";
import { Comment } from "@/types/comments";
import useApi from "./useApi";

function useComments(postId: string, token: string | null, userId: string | null, setError: (error: string) => void) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const {fetchData} = useApi("GET", false);
    const {fetchData: postCommentApi} = useApi("POST", true);
    const {fetchData: deleteCommentApi} = useApi("DELETE", true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const comments = await fetchData("/comments/post/${postId}");
                setComments(comments);
                setCommentLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setCommentError("Failed to fetch comments");
                setCommentLoading(false);
            }
        }
        fetchComments();
    }, [fetchData]);

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
            const data = await postCommentApi("/comments/post", json);
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
            await deleteCommentApi(`/comments/${id}`);
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