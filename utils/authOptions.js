import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/config/database"
import User from "@/models/User"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            await connectDB()
            const userExists = await User.findOne({ email: profile.email })

            if (!userExists) {
                try {
                    const newUser = await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    })
                    console.log("New user created:", newUser)
                } catch (error) {
                    console.error("Error creating user:", error)
                    throw new Error("Failed to create user")
                }
            }
            return true
        },
        async session({ session }) {
            const user = await User.findOne({ email: session.user.email })
            if (!user) {
                throw new Error("User not found in session callback")
            }
            session.user.id = user._id.toString()
            return session
        },
    },
}
