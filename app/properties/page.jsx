import PropertyCard from "@/components/PropertyCard"
import Property from "@/models/Property"
import connectDB from "@/utils/connectDB"

const PropertiesPage = async () => {
    await connectDB()
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean()

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container mx-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PropertiesPage
