"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { Post } from "@/types/posts";
import { fetchPostById } from "../fetchpostid";
import EditButton from "@/app/posts/EditButton";
import CommentForm from "../CommentForm";
import useAuth from "../../hooks/useauth";
import CommentsList from "../CommentList";
import useComments from "../../hooks/useComments";

function PostView() {
    const { id: postId } = useParams() as { id: string };
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuth();

    const {
    comments,
    commentTitle, setCommentTitle,
    commentContent, setCommentContent,
    postComment, deleteComment,
    commentLoading, commentError, message,
    } = useComments(postId, user?.userid || "", token, setError);

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

                    <CommentsList
                        comments={comments}
                        activeCommentId={activeCommentId}
                        setActiveCommentId={setActiveCommentId}
                        deleteComment={deleteComment}
                        userid={user?.userid || ""}
                    />
                </div>
            </div>
        </>
    )

}
export default PostView;
