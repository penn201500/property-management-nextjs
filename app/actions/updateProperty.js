"use server"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function updateProperty(propertyId, formData) {
    await connectDB()
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.user) {
        throw new Error("You must be logged in to update a property")
    }

    const { userId } = sessionUser

    const existingProperty = await Property.findById(propertyId)

    // Verify Ownership
    if (!existingProperty) {
        return { error: "Property not found" }
    }

    if (existingProperty.owner?.toString() !== userId) {


        return { error: "You are not authorized to update this property" }
    }

    const amenities = formData.getAll("amenities")

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

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData)

    revalidatePath("/", "updateProperties")

    redirect(`/properties/${updatedProperty._id}`)
}

export default updateProperty
