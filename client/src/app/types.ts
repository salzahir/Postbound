interface User {
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
}

export { User, Post };