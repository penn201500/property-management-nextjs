"use client"
import { useState, useEffect } from "react"
import { setDefaults, fromAddress } from "react-geocode"

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        height: "500px",
    })

    const [loading, setLoading] = useState(true)
    const [geocodeError, setGeocodeError] = useState(false)

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: "en",
        region: "us",
    })

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`)
                if (res.results.length === 0) {
                    setGeocodeError(true)
                    return
                }

                const { lat, lng } = res.results[0].geometry
                setLat(lat)
                setLng(lng)
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng,
                })

                console.log(`🚀 ~ file: PropertyMap.jsx:36 ~ fetchCoords ~ lng:\n`, lng)

                console.log(`🚀 ~ file: PropertyMap.jsx:36 ~ fetchCoords ~ lat:\n`, lat)
            } catch (error) {
                console.log("There was an error", error)
                setGeocodeError(true)
            } finally {
                setLoading(false)
            }
        }
    })

    if (loading) {
        return <div>Loading...</div>
    }
    if (geocodeError) {
        return <div>No location data found</div>
    }

    return <div>map</div>
}

export default PropertyMap
