import prisma from "../config/prisma";

async function getPosts(publicOnly: boolean = true) {
    try {
        const posts = await prisma.post.findMany({
            where: publicOnly ? { isPublic: true } : undefined,
            include: { user: true },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Could not fetch posts");
    }
}

async function postPost(title: string, content: string, userid: string, isPublic: boolean = true) {
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                user: {
                    connect: { userid: userid },
                },
                isPublic,
            },
        });
        return newPost;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Could not create post");
    }
}

async function updatePost(id: number, title: string, content: string, isPublic: boolean = true) {
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content },
        });
        return updatedPost;
    } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Could not update post");
    }
}

async function deletePost(id: number) {
    try {
        await prisma.comment.deleteMany({
            where: { postId: id },
        });
        const deletedPost = await prisma.post.delete({
            where: { id },
        });
        return deletedPost;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Could not delete post");
    }
}

async function togglePost(id: number, isPublic: boolean) {
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { isPublic },
        });
        return updatedPost;
    } catch (error) {
        console.error("Error toggling post visibility:", error);
        throw new Error("Could not toggle post visibility");
    }
}

async function getPostById(id: number) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });
        return post;
    } catch (error) {
        console.error("Error fetching post by id:", error);
        throw new Error("Could not fetch post by id");
    }
}

export { getPosts, postPost, updatePost, deletePost, togglePost, getPostById };