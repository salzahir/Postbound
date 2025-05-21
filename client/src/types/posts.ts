interface User {
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
}

export type { User, Post };