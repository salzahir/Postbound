import Header from "../header";
import PostCard from "./PostCard";
import { Post } from "@/types/posts";

async function Posts() {
    const posts = await fetch("http://localhost:3001/posts");
    const data = await posts.json() as Post[];
    
    if(data.length === 0) {
        return (
            <>
                <Header />
                <div>
                    <h1>No posts available</h1>
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <main>
                <h1>Posts</h1>
                <div>
                    {data.map((post) => (
                          <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Posts; 