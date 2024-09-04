import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions"

export const getSessionUser = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return null
        }

        return {
            user: session.user,
            userId: session.user.id,
        }
    } catch (error) {
        console.log("There was an error getting the session user:", error)
    }
}
