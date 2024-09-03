import PropertyCard from "@/components/PropertyCard"
import Link from "next/link"
import Property from "@/models/Property"
import connectDB from "@/config/database"

const HomeProperties = async () => {
    await connectDB()
    const recentProperties = await Property.find({}).sort({ createdAt: -1 }).limit(3).lean()

    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container mx-auto px-4 py-6">
                    {recentProperties.length === 0 ? (
                        <p>No properties found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentProperties.map(property => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="m-auto max-w-lg my-6 px-6">
                <Link
                    href="/properties"
                    className="block bg-blue-500 hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-center">
                    Browse All Properties
                </Link>
            </section>
        </>
    )
}

export default HomeProperties
