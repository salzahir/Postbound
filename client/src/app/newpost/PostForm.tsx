import { FormEvent } from "react";
import dynamic from 'next/dynamic';
import ApiError from "../components/error/ApiError";

const TinyMCEEditor = dynamic(() => import("../components/editor/TinyMCEEditor"), {
    ssr: false,
    loading: () => <div className="h-[500px] bg-gray-100 rounded animate-pulse" />
});

type PostFormProps = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    title: string;
    content: string;
    isPublic: boolean;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setIsPublic: (isPublic: boolean) => void;
    submitLabel: string;
    error: string;
    success: string;
    isApiDown?: boolean;
};

function PostForm({
    onSubmit,
    title,
    content,
    isPublic,
    setTitle,
    setContent,
    setIsPublic,
    submitLabel,
    error,
    success,
    isApiDown = false,
}: PostFormProps) {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="title" className="block text-white mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-white mb-2">Content</label>
                <div className="bg-white rounded">
                    <TinyMCEEditor
                        value={content}
                        onChange={setContent}
                        height={400}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="flex items-center text-white">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="mr-2"
                    />
                    Public Post
                </label>
            </div>
            {error && <ApiError message={error} isApiDown={isApiDown} />}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                {submitLabel}
            </button>
        </form>
    );
}

export default PostForm; 