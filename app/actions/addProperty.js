"use server"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function addProperty(formData) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
        throw new Error("You must be logged in to add a property")
    }

    const { userId } = sessionUser

    const amenities = formData.getAll("amenities")
    const images = formData
        .getAll("images")
        .filter(image => image.name !== "")
        .map(image => image.name)

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
        images,
    }

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
