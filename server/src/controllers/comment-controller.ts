import * as commentsDB from '../db/comments';
import { Request, Response } from 'express';

async function handleGetComments(req: Request, res: Response): Promise<void> {
    try {
        const comments = await commentsDB.getComments();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handlePostComment(req: Request, res: Response): Promise<void> {
    const { postId, content, title } = req.body;
    const userId = req.user?.id;
    try {
        const newComment = await commentsDB.postComment(title, content, postId, userId);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleGetCommentById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const comment = await commentsDB.getCommentById(Number(id));
        if (!comment) {
            res.status(404).json({ message: "Comment not found" });
            return;
        }
        res.status(200).json(comment);
    }
    catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUpdateComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { content, title } = req.body;
    try {
        const updatedComment = await commentsDB.updateComment(Number(id), content, title);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleDeleteComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const deletedComment = await commentsDB.deleteComment(Number(id));
        res.status(200).json(deletedComment);
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { handleGetComments, handlePostComment, handleGetCommentById, handleUpdateComment, handleDeleteComment };