import * as postDB from '../db/posts';
import { Request, Response } from 'express';
import { devLog } from '../utils/devlog';

async function handleGetPosts(req: Request, res: Response): Promise<void> {
    try {
        // If user is authenticated and is an author, show all posts
        const publicOnly = !req.user?.isAuthor;
        const posts = await postDB.getPosts(publicOnly);
        res.status(200).json(posts);
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: error.message });
    }
}

async function handlePostPost(req: Request, res: Response): Promise<void> {
    const { title, content, isPublic} = req.body;
    const userid = req.user?.id;
    try {
        const newPost = await postDB.postPost(title, content, userid, isPublic);
        devLog("POSTED:", newPost);
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
        console.error("Error updating post:", error);
        res.status(500).json({ message: error.message });
    }
}

async function handleDeletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const deletedPost = await postDB.deletePost(Number(id));
        res.status(200).json(deletedPost);
    } catch (error: any) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: error.message });
    }
}

async function handleTogglePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { isPublic } = req.body;
    try {
        const updatedPost = await postDB.togglePost(Number(id), isPublic);
        res.status(200).json(updatedPost);
    } catch (error: any) {
        console.error("Error toggling post visibility:", error);
        res.status(500).json({ message: error.message });
    }
}

export { handleGetPosts, handlePostPost, handleUpdatePost, handleDeletePost, handleTogglePost };