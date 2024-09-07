"use client"
import { useState, useEffect } from "react"
import { setDefaults, fromAddress } from "react-geocode"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import Image from "next/image"
import pin from "@/assets/images/pin.svg"
import Spinner from "@/components/Spinner"

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
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "us",
    })

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
        fetchCoords()
    }, [])

    if (loading) {
        return <Spinner loading={loading} />
    }
    if (geocodeError) {
        return <div>No location data found</div>
    }

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import("mapbox-gl")}
                initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
                style={{ width: "100%", height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                <Marker
                    latitude={lat}
                    longitude={lng}
                    anchor="bottom">
                    <Image
                        src={pin}
                        alt="location"
                        width={40}
                        height={40}
                    />
                </Marker>
            </Map>
        )
    )
}

export default PropertyMap
