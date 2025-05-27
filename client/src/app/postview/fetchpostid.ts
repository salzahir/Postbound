import { getApiUrl } from '../services/api';

export async function fetchPostById(id: string) {
  try {
    const res = await fetch(getApiUrl(`/posts/${id}`));
    if (!res.ok) throw new Error("Failed to fetch post");
    const post = await res.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}