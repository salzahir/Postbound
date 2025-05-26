import { FormEvent } from "react";

type CommentFormProps = {
    postId: number;
    userId: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    title: string;
    content: string;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
};

function CommentForm({ onSubmit, submitLabel, title, content, setTitle, setContent }: CommentFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
            <label htmlFor="title" className="text-sm font-semibold text-white">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <label htmlFor="content" className="text-sm font-semibold text-white">Content</label>
            <textarea
                name="content"
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            ></textarea>
            <button type="submit">{submitLabel}</button>
        </form>
    );
}

export default CommentForm;