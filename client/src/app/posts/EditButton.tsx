import Link from "next/link"

function EditButton({id, isAuthor}: { id: number; isAuthor: boolean | null }) {
    return (
        <>
            {isAuthor && (
                <Link href={`/editpost/${id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        Edit Post
                    </button>
                </Link>
            )}
        </>
    )
}

export default EditButton;