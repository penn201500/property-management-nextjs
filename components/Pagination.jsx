import Link from "next/link"

const Pagination = ({ page, pageSize, totalItems }) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    return (
        <section className="container mx-auto flex justify-center items-center my-8">
            {page > 1 ? (
                <Link
                    className="mr-2 px-2 py-1 border border-gray-300 items-center my-8 bg-blue-500 text-white rounded-md"
                    href={`/properties?page=${page - 1}`}>
                    Previous
                </Link>
            ) : null}

            <span className="mx-2">
                Page <span className="text-blue-700">{page}</span> of <span className="text-blue-700">{totalPages}</span>
            </span>
            {page < totalPages ? (
                <Link
                    className="mr-2 px-2 py-1 border border-gray-300 items-center my-8 bg-blue-500 text-white rounded-md"
                    href={`/properties?page=${page + 1}`}>
                    Next
                </Link>
            ) : null}
        </section>
    )
}

export default Pagination
