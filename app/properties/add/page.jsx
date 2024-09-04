import PropertyAddForm from "@/components/PropertyAddForm"

const AddProperty = () => {
    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                    <PropertyAddForm />
                </div>
            </div>
        </section>
    )
}

export default AddProperty
