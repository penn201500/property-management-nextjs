"use server"
import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteProperty(propertyId) {
    await connectDB()
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
        return { error: "You must be logged in to delete a property" }
    }

    const { userId } = sessionUser

    const property = await Property.findById(propertyId)
    if (!property) {
        return { error: "Property not found" }
    }
    if (property.owner?.toString() !== userId) {
        return { error: "You are not authorized to delete this property" }
    }

    // Delete images from cloudinary
    console.log(`Here are the images: ${property.images}`)
    const publicIds = property.images.map(imageUrl => {
        const parts = imageUrl.split("/")
        return parts.at(-1).split(".")[0]
    })
    if (publicIds.length) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy("property_management/" + publicId)
        }
    }

    // Delete property
    await property.deleteOne()
    // Revalidata cache
    revalidatePath("/", "deleteProperties")
}

export default deleteProperty
