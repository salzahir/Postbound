import { useEffect, useState, FormEvent } from "react";
import { Comment } from "@/types/comments";
import useApi from "./useApi";

function useComments(postId: string, token: string | null, userId: string | null, setError: (error: string) => void) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentLoading, setCommentLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const {fetchData, error: fetchError} = useApi("GET", false);
    const {fetchData: postCommentApi, error: postError} = useApi("POST", true);
    const {fetchData: deleteCommentApi, error: deleteError} = useApi("DELETE", true);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await fetchData(`/comments/post/${postId}`);
            if (data !== null) {
                setComments(data);
            }
            setCommentLoading(false);
        }
        fetchComments();
    }, [fetchData, postId]);

    async function postComment(event: FormEvent<HTMLFormElement>) {
        setError("");
        setMessage("");
        event.preventDefault();
        const json = {
            title: commentTitle,
            content: commentContent,
            postId: Number(postId),
            userId: userId || "",
        };
        const data = await postCommentApi("/comments/post", json);
        if (data !== null) {
            setComments((prevComments) => [...prevComments, data]);
            setMessage("Comment posted successfully!");
        }
        setCommentLoading(false);
    }

    async function deleteComment(id: number) {
        const success = await deleteCommentApi(`/comments/${id}`);
        if (success !== null) {
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
            setMessage("Comment deleted successfully!");
        }
    }

    return {
        comments,
        commentTitle,
        setCommentTitle,
        commentContent,
        setCommentContent,
        commentLoading,
        commentError: fetchError || postError || deleteError,
        message,
        postComment,
        deleteComment,
    };
}

export default useComments;