"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "../../header";
import { Post } from "../../../types/posts";
import { Comment } from "../../../types/comment";

function PostView() {
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentError, setCommentError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await fetch(`http://localhost:3001/posts/${id}`)
                const post = await data.json();
                setPost(post);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Failed to fetch post");
                setLoading(false);
            }
        }
        fetchPost();
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
            <div>PostView
                <p>{post.title}</p>
                <p>{post.content}</p>
                <p>{post.createdAt}</p>
                <p>{post.updatedAt}</p>
                <p>{post.isPublic}</p>
            </div>

            <div>
                <h1>Comments</h1>
                {token && (
                    <form>
                        <textarea placeholder="Add a comment" />
                        <button type="submit">Add Comment</button>
                    </form>
                )}
                {!token && (
                    <p>Please login to add a comment</p>
                )}

                <div>
                    {commentLoading && <p>Loading comments...</p>}
                    {commentError && <p>Error: {commentError}</p>}
                    {comments.length === 0 && <p>No comments yet</p>}

                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.title}</p>
                            <p>{comment.content}</p>
                            <p>{comment.createdAt}</p>
                            <p>{comment.updatedAt}</p>
                            <p>{comment.user.username}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
    
}

export default PostView;