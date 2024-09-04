"use server"

async function addProperty(formData) {
    const amenities = formData.getAll("amenities")
    const images = formData
        .getAll("images")
        .filter(image => image.name !== "")
        .map(image => image.name)

    const propertyData = {
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        localtion: {
            street: formData.get("localtion.street"),
            city: formData.get("localtion.city"),
            state: formData.get("localtion.state"),
            zipcode: formData.get("localtion.zipcode"),
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        square_feet: formData.get("square_feet"),
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
    console.log("Property data:", propertyData);
}

export default addProperty
