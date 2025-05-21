import { Post } from "../../types/posts";

type Props = {
    post: Post;
}

function PostCard({post}: Props) {
    return (
            <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.user.name}</p>
            <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
            <p>{post.isPublic ? "Public" : "Private"}</p>
        </div>
    )
}

export default PostCard;