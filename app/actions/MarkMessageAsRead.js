"use server"
import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function MarkMessageAsRead(messageId) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
        console.error("Session user is missing or invalid")
        throw new Error("You must be logged in to add a property")
    }

    const { userId } = sessionUser

    const message = await Message.findById(messageId)
    if (!message) {
        console.error(`Message with ID ${messageId} not found`)
        throw new Error("Message not found")
    }

    if (message.recipient.toString() !== userId) {
        throw new Error("Unauthorized")
    }

    message.read = !message.read

    revalidatePath("/messages", "page")
    await message.save()
    return message.read
}

export default MarkMessageAsRead
