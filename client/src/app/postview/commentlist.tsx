import { Comment } from "@/types/comments"
import CommentCard from "./commentcard";

type CommentsListProps = {
    comments: Comment[];
    userid: string;
    token: string;
    setActiveCommentId: (id: number | null) => void;
    activeCommentId: number | null;
    deleteComment: (id: number) => void;
};

function CommentsList({comments, userid, token, setActiveCommentId, activeCommentId, deleteComment}: CommentsListProps) {
    return (
        comments.map((comment) => (
            <CommentCard
                key={comment.id}
                comment={comment}
                setActiveCommentId={setActiveCommentId}
                activeCommentId={activeCommentId}
                deleteComment={deleteComment}
                token={token}
                userid={userid}
            />
        ))
    );
}
    
export default CommentsList;