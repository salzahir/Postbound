export interface User {
    name: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
} 