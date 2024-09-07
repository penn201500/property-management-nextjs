import connectDB from "@/config/database"
import Property from "@/models/Property"
import PropertyHeaderImage from "@/components/PropertyHeaderImage"
import BackToProperties from "@/components/BackToProperties"
import PropertyDetails from "@/components/PropertyDetails"
import PropertyImages from "@/components/PropertyImages"
import { convertToSerializableObject } from "@/utils/convertToObjects"

const PropertyPage = async ({ params }) => {
    await connectDB()
    const propertyDoc = await Property.findById(params.id).lean()
    const property = propertyDoc ? convertToSerializableObject(propertyDoc) : null

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <BackToProperties />
            <PropertyDetails property={property} />
            <PropertyImages images={property.images} />
        </>
    )
}

export default PropertyPage
