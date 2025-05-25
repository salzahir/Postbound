"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "../../header";
import { Post } from "@/types/posts";
import { Comment } from "@/types/comments";
import { FormEvent } from "react";
import { fetchPostById } from "../fetchpostid";

function PostView() {
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);


  useEffect(() => {
  async function loadPost() {
        try {
        const data = await fetchPostById(id);
        setPost(data);
        setLoading(false);
        } catch (error) {
        setError("Failed to fetch post");
        setLoading(false);
        console.error("Error fetching post:", error);
        }
    }

    loadPost();
    }, [id]);


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await fetch(`http://localhost:3001/comments/post/${id}`)
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
    }, [id]);

    async function postComment(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const json = {
                title: formData.get("title"),
                content: formData.get("content"),
                postId: id,
                userId: token,
            };
            try {
                const res = await fetch("http://localhost:3001/comments/post/:postId", {
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
                    <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
                    <p>Status: <span className={post.isPublic ? "text-green-400" : "text-red-400"}>{post.isPublic ? "Public" : "Private"}</span></p>
                </div>
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
                      <form onSubmit={postComment} className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
                        <label htmlFor="title" className="text-sm font-semibold text-white">Title</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <label htmlFor="content" className="text-sm font-semibold text-white">Content</label>
                        <textarea
                          name="content"
                          id="content"
                          required
                          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        ></textarea>
                        <button type="submit">Add Comment</button>
                      </form>
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
                            <p><span className="text-sm text-gray-400">Created:</span> {new Date(comment.createdAt).toLocaleDateString()}</p>
                            <p><span className="text-sm text-gray-400">Updated:</span> {new Date(comment.updatedAt).toLocaleDateString()}</p>
                            <p><span className="text-sm text-gray-400">Author:</span> {comment.user.username}</p>
                            <p><span className="font-semibold">Role:</span> {comment.user.isAuthor ? 'Author' : 'User'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
    
}
export default PostView;
