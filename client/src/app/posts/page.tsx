import Header from "../header";

interface User {
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
}

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
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>Author: {post.user.name}</p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default Posts; 