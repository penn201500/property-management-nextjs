import PropertyCard from "@/components/PropertyCard"
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

// Mark page as dynamic
export const dynamic = "force-dynamic"

const SavedPropertiesPage = async () => {
    const { userId } = await getSessionUser()
    const { bookmarks } = await User.findById(userId).populate("bookmarks")

    return (
        <section className="px-4 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Saved Properties</h1>
                {bookmarks.length === 0 ? (
                    <p>No saved properties</p>
                ) : (
                    <div className="grid grid-cols md:grid-cols-3 gap-6">
                        {bookmarks.map(property => (
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

export default SavedPropertiesPage
