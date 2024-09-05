"use server"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import cloudinary from "@/config/cloudinary"

async function addProperty(formData) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
        throw new Error("You must be logged in to add a property")
    }

    const { userId } = sessionUser

    const amenities = formData.getAll("amenities")
    const images = formData.getAll("images").filter(image => image.name !== "")

    const propertyData = {
        owner: userId,
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode"),
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        squareFeet: formData.get("square_feet"),
        amenities,
        rates: {
            daily: formData.get("rates.daily"),
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly"),
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },
    }

    const imageUrls = []
    for (let imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer()
        const imageArray = Array.from(new Uint8Array(imageBuffer))
        const imageData = Buffer.from(imageArray)

        // Convert to base64
        const imageBase64 = imageData.toString("base64")
        // Upload the image to Cloudinary
        const image = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: "property_management",
        })
        imageUrls.push(image.secure_url)
    }

    console.log(`Here are the image URLs: ${imageUrls}`);

    propertyData.images = imageUrls

    // // Print the FormData contents
    // console.log("FormData contents:")
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`)
    // }

    const newProperty = new Property(propertyData)
    await newProperty.save()

    revalidatePath("/", "addProperty")

    redirect(`/properties/${newProperty._id}`)
}

export default addProperty
