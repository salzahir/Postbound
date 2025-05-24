import { Post } from "../../types/posts";
import Link from "next/link";

type Props = {
    post: Post;
}

function PostCard({ post }: Props) {
    return (
        <div key={post.id} className="flex justify-between gap-4 p-6 border border-gray-700 rounded-lg shadow-md mb-4 bg-gray-900 text-white">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-yellow-400">Post Title: {post.title}</h2>
                <h3 className="text-lg font-semibold text-gray-300">Post Content</h3>
                <p className="text-gray-200 line-clamp-4">{post.content}</p>
            </div>
            <div className="flex flex-col justify-between gap-2">
            <p className="text-sm text-gray-400">Author: {post.user.name}</p>
                <p className="text-sm text-gray-400">Created at: {new Date(post.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-400">Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
                <p className={`text-sm font-medium ${post.isPublic ? "text-green-400" : "text-red-400"}`}>
                    {post.isPublic ? "Public" : "Private"}
                </p>
            </div>
            <Link href={`/postview/${post.id}`}>View Post</Link>
        </div>
    );
}

export default PostCard;