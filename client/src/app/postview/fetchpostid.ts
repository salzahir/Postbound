export async function fetchPostById(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    const post = await res.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}