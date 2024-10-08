"use client"
import { useState, useEffect } from "react"
import { setDefaults, fromAddress } from "react-geocode"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import Spinner from "@/components/Spinner"

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [geocodeError, setGeocodeError] = useState(false)

    // Load the Google Maps script - call this hook first before any conditional rendering
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    })

    // Set Google Geocode defaults
    useEffect(() => {
        setDefaults({
            key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
            language: "en",
            region: "us",
        })
    }, [])

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`)
                if (res.results.length === 0) {
                    setGeocodeError(true)
                    setLoading(false)
                    return
                }

                const { lat, lng } = res.results[0].geometry.location
                setLat(lat)
                setLng(lng)
            } catch (error) {
                console.log("There was an error", error)
                setGeocodeError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchCoords()
    }, [property])

    // Ensure consistent render for hooks
    if (!isLoaded) {
        return <Spinner loading={loading} />
    }

    if (geocodeError) {
        return <div>No location data found</div>
    }

    return (
        !loading &&
        lat &&
        lng && (
            <GoogleMap
                center={{ lat: lat, lng: lng }}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "500px" }}>
                <Marker position={{ lat: lat, lng: lng }} />
            </GoogleMap>
        )
    )
}

export default PropertyMap
