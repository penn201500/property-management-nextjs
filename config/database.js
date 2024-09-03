import mongoose from "mongoose"

let connected = false

async function connectDB() {
    mongoose.set("strictQuery", true)

    // If the db is connected, don't connect again
    if (connected) {
        console.log("=> using existing database connection")
        return
    }
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
    } catch (error) {
        console.log("Error connecting to database: ", error)
    }
}

export default connectDB
