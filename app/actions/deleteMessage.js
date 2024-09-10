"use server"
import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteMessage(messageId) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
        throw new Error("You must be logged in to add a property")
    }

    const { userId } = sessionUser

    const message = await Message.findById(messageId)

    if (message.recipient.toString() !== userId) {
        throw new Error("Unauthorized")
    }

    await message.deleteOne()

    revalidatePath("/", "layout")
}

export default deleteMessage
