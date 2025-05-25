"use client";

type PostFormProps = {
    title: string;
    content: string;
    isPublic: boolean;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error: string;
    success: string;
    submitLabel: string;
};

function PostForm({
    title,
    content,
    isPublic,
    setTitle,
    setContent,
    setIsPublic,
    onSubmit,
    error,
    success,
    submitLabel
}: PostFormProps) {
    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content">Content</label>
                <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    Public Post
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    {submitLabel}
                </button>
            </form>
            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
    );
}

export default PostForm;