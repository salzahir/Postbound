import prisma from "../config/prisma";

async function getComments() {
    try {
        const comments = await prisma.comment.findMany({
            include: { user: true },
        });
        return comments;    
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Could not fetch comments");
    }
}

async function postComment(title: string, content: string, postId: number, userId: string) {
    try {
        const newComment = await prisma.comment.create({
            data: {
                title,
                content,
                postId,
                userId
            },
        });
        return newComment;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Could not create comment");
    }
}

async function getCommentById(id: number) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id },
            include: { user: false },
        });
        if (!comment) {
            throw new Error("Comment not found");
        }
        return comment;
    } catch (error) {
        console.error("Error fetching comment:", error);
        throw new Error("Could not fetch comment");
    }
}

async function updateComment(id: number, title: string, content: string) {
    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { title, content },
        });
        return updatedComment;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw new Error("Could not update comment");
    }
}

async function deleteComment(id: number) {
    try {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });
        return deletedComment;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw new Error("Could not delete comment");
    }
}

export { getComments, postComment, getCommentById, updateComment, deleteComment };
