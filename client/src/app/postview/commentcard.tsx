import { Comment } from "@/types/comments"
import UpdateComment from "./UpdateComment"

type CommentCardProps = {
    comment: Comment;
    activeCommentId: number | null;
    setActiveCommentId: (id: number | null) => void;
    deleteComment: (id: number) => void;
    userid: string;
}

function CommentCard({ comment, setActiveCommentId, activeCommentId, deleteComment, userid }: CommentCardProps) {
  return (
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
      {comment.user && comment.user.userid === userid && (
        <div className="flex flex-col gap-2 mt-2">
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
          >
            {activeCommentId === comment.id ? "Hide Update Form" : "Edit Comment"}
          </button>
          {activeCommentId === comment.id && (
            <UpdateComment
              comment={comment}
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
  );
}

export default CommentCard;