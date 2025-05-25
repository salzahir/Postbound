import { User } from './users';

interface Comment {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    postId: number;
    user: User;
}

export type { Comment };