require("dotenv").config()
const fs = require("fs")
const path = require("path")
const cloudinary = require("cloudinary").v2
const properties = require("../properties.json")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

console.log(process.env.CLOUDINARY_API_KEY)

// Function to convert image to base64
function convertImageToBase64(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath)
        return imageBuffer.toString("base64")
    } catch (error) {
        console.error(`Error converting image to base64 for ${imagePath}:`, error)
        return null
    }
}

// Function to upload images to Cloudinary
async function uploadImagesToCloudinary() {
    const uploadedPropertyImages = []

    for (let property of properties) {
        const imageUrls = []

        for (let imageFileName of property.images) {
            const filePath = path.join(__dirname, "../public/images/properties", imageFileName)

            // Convert image to base64 using the new function
            const imageBase64 = convertImageToBase64(filePath)

            // Proceed with upload only if base64 conversion is successful
            if (imageBase64) {
                try {
                    // Upload the image to Cloudinary
                    const image = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, {
                        folder: "property_management",
                    })

                    // Push the secure URL to the imageUrls array
                    imageUrls.push(image.secure_url)
                    console.log(`Uploaded ${imageFileName} successfully: ${image.secure_url}`)
                } catch (error) {
                    console.error(`Error uploading ${imageFileName}:`, error)
                }
            }
        }

        // Add the uploaded image URLs to the property object
        uploadedPropertyImages.push({
            propertyId: property._id,
            imageUrls: imageUrls,
        })
    }

    return uploadedPropertyImages
}

// Call the function to upload images
uploadImagesToCloudinary()
    .then(result => {
        console.log("All images uploaded successfully:", result)
    })
    .catch(error => {
        console.error("Error uploading images:", error)
    })
