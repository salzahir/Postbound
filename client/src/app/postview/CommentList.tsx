import { Comment } from "@/types/comments"
import CommentCard from "./CommentCard";

type CommentsListProps = {
    comments: Comment[];
    userid: string;
    setActiveCommentId: (id: number | null) => void;
    activeCommentId: number | null;
    deleteComment: (id: number) => void;
};

function CommentsList({comments, userid, setActiveCommentId, activeCommentId, deleteComment}: CommentsListProps) {
    return (
        comments.map((comment) => (
            <CommentCard
                key={comment.id}
                comment={comment}
                setActiveCommentId={setActiveCommentId}
                activeCommentId={activeCommentId}
                deleteComment={deleteComment}
                userid={userid}
            />
        ))
    );
}
    
export default CommentsList;