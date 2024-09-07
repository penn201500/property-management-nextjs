"use client"

import { FaBookmark } from "react-icons/fa"
import { useState, useEffect } from "react"
import bookmarkProperty from "@/app/actions/bookmarkProperty"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import checkBookmarkStatus from "@/app/actions/checkBookmarksStatus"

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession()
    const userId = session?.user?.id

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            if (!userId) {
                setLoading(false)
                return
            }
            try {
                const { isBookmarked } = checkBookmarkStatus(property._id)
                setIsBookmarked(isBookmarked)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchBookmarkStatus()
    }, [property._id, userId])

    const handleClick = async () => {
        if (!userId) {
            toast.error("You must be logged in to bookmark a property")
            return
        }

        setLoading(true)
        try {
            const { message, isBookmarked } = await bookmarkProperty(property._id)
            setIsBookmarked(isBookmarked)
            toast.success(message)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return isBookmarked ? (
            <button
                onClick={handleClick}
                className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <FaBookmark className="mr-2" />
                Remove Bookmark
            </button>
        ) : (
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                <FaBookmark className="mr-2" />
                Bookmark Property
            </button>
        )
    }
}

export default BookmarkButton
