"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "../../components/layout/header";
import { Post } from "@/types/posts";
import { Comment } from "@/types/comments";
import { FormEvent } from "react";
import { fetchPostById } from "../fetchpostid";
import EditButton from "@/app/posts/editbutton";
import CommentForm from "../commentform";
import UpdateComment from "../updateform";
import { getApiUrl } from '../../services/api';
import useAuth from "../../hooks/useauth";

function PostView() {
    const { id } = useParams()
    const postId = id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

    useEffect(() => {
        async function loadPost() {
            try {
                const data = await fetchPostById(postId);
                setPost(data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch post");
                setLoading(false);
                console.error("Error fetching post:", error);
            }
        }

        loadPost();
    }, [postId]);


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
            userId: user?.userid || "",
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


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!post) {
        return <div>Post not found</div>;
    }
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white rounded-lg shadow-md mt-6 mb-6">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">{post.title}</h1>
                <p className="text-lg text-gray-200 mb-6 max-w-xl text-center">{post.content}</p>
                <div className="flex gap-6 text-sm text-gray-400">
                    <p>Created: {new Date(post.createdAt).toISOString().split("T")[0]}</p>
                    <p>Updated: {new Date(post.updatedAt).toISOString().split("T")[0]}</p>
                    <p>Status: <span className={post.isPublic ? "text-green-400" : "text-red-400"}>{post.isPublic ? "Public" : "Private"}</span></p>
                </div>
                <EditButton id={post.id} isAuthor={user?.isAuthor ?? null} />
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h1>Comments</h1>

                {message && <p className="text-green-400">{message}</p>}
                {commentError && <p className="text-red-400">{commentError}</p>}
                {token && (
                    <>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                        >
                            {showForm ? "Hide Form" : "Add Comment"}
                        </button>
                        {showForm && (
                            <CommentForm
                                postId={Number(postId)}
                                userId={user?.userid || ""}
                                onSubmit={postComment}
                                submitLabel="Add Comment"
                                title={commentTitle}
                                content={commentContent}
                                setTitle={setCommentTitle}
                                setContent={setCommentContent}
                            />
                        )}
                    </>
                )}

                {!token && (
                    <p className="text-gray-400 bg-gray-900 p-4 rounded-lg shadow-md">
                        Please login to add a comment
                    </p>
                )}

                <div>
                    {commentLoading && <p>Loading comments...</p>}
                    {commentError && <p>Error: {commentError}</p>}
                    {comments.length === 0 && <p>No comments yet</p>}

                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex flex-col gap-1 p-6 mb-4 bg-gray-900 text-white rounded-lg shadow-md"
                        >
                            <p><span className="font-semibold text-gray-300">Title:</span> {comment.title}</p>
                            <p><span className="font-semibold text-gray-300">Content:</span> {comment.content}</p>
                            <p><span className="text-sm text-gray-400">Created:</span> {new Date(comment.createdAt).toISOString().split("T")[0]}</p>
                            <p><span className="text-sm text-gray-400">Updated:</span> {new Date(comment.updatedAt).toISOString().split("T")[0]}</p>
                            {comment.user?.username && (
                                <p><span className="text-sm text-gray-400">Author:</span> {comment.user.username}</p>
                            )}
                            <p><span className="font-semibold">Role:</span> {comment.user?.isAuthor ? 'Author' : 'User'}</p>
                            {comment.user && comment.user.userid === user?.userid && (
                                <div className="flex flex-col gap-2 mt-2">
                                    <button
                                        className="text-blue-400 hover:underline"
                                        onClick={() =>
                                            setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
                                    >
                                        {activeCommentId === comment.id ? "Hide Update Form" : "Edit Comment"}
                                    </button>
                                    {activeCommentId === comment.id && (
                                        <UpdateComment
                                            comment={comment}
                                            token={token ? token : ""}
                                        />
                                    )}
                                    <button
                                        className="text-red-400 hover:underline"
                                        onClick={() => deleteComment(comment.id)}
                                    >
                                        Delete Comment
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}
export default PostView;
