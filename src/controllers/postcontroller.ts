import * as postDB from '../db/posts';
import { Request, Response } from 'express';

async function handleGetPosts(req: Request, res: Response): Promise<void> {
    try {
        const posts = await postDB.getPosts();
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function handlePostPost(req: Request, res: Response): Promise<void> {
    const { title, content, userid } = req.body;
    try {
        const newPost = await postDB.postPost(title, content, userid);
        res.status(201).json(newPost);
    } catch (error: any) {
        console.error("CREATE POST ERROR:", error);
        res.status(500).json({ message: error.message });
    }
}

async function handleUpdatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await postDB.updatePost(Number(id), title, content);
        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function handleDeletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const deletedPost = await postDB.deletePost(Number(id));
        res.status(200).json(deletedPost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { handleGetPosts, handlePostPost, handleUpdatePost, handleDeletePost };