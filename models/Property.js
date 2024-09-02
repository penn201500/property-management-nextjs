import { Schema, model, models } from "mongoose"

const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Property name is required"],
        },
        type: {
            type: String,
            required: [true, "Property type is required"],
        },
        description: {
            type: String,
            required: [true, "Property description is required"],
        },
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String,
        },
        beds: {
            type: Number,
            required: [true, "Number of beds is required"],
        },
        baths: {
            type: Number,
            required: [true, "Number of baths is required"],
        },
        squareFeet: {
            type: Number,
            required: [true, "Square footage is required"],
        },
        amenities: [
            {
                type: String,
            },
        ],
        rates: {
            daily: Number,
            weekly: Number,
            monthly: Number,
        },
        seller_info: {
            name: String,
            email: String,
            phone: String,
        },
        images: [
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Property = models.Property || model("Property", PropertySchema)

export default Property
