"use client"

import { FaBookmark } from "react-icons/fa"
import { useState } from "react"
import bookmarkProperty from "@/app/actions/bookmarkProperty"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession()
    const userId = session?.user?.id

    // const [bookmarked, setBookmarked] = useState(property.bookmarkedBy.includes(userId))

    const handleClick = async () => {
        if (!userId) {
            toast.error("You must be logged in to bookmark a property")
            return
        }

        try {
            const { message, isBookmarked } = await bookmarkProperty(property._id)
            toast.success(message)
            // setBookmarked(isBookmarked)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
            <FaBookmark className="mr-2" />
            Bookmark Property
        </button>
    )
}

export default BookmarkButton
