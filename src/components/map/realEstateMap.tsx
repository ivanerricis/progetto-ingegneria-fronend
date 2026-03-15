import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useRef } from "react"
import MarkerClusterGroup from "react-leaflet-cluster"
import { createPriceIcon } from "./markerIcon"
import { useNavigate } from "react-router-dom"
import type { Advertisement } from "@/types/types"
import { MarkerHoverCard } from "./markerHoverCard"
import type { Marker as LeafletMarker } from "leaflet"

type Props = {
    advertisements: Advertisement[]
}

type MarkerData = {
    id: string
    price: number
    latitude: number
    longitude: number
    photos: Advertisement["photos"]
}

const extractCoordinates = (ad: Advertisement): { latitude: number; longitude: number } | null => {
    const realEstate = ad.realEstate as {
        coordinates?: { latitude?: number; longitude?: number }
        location?: { coordinates?: [number, number] } | [number, number]
    } | undefined

    const rawCoordinates = realEstate?.coordinates
        ?? (realEstate?.location as { coordinates?: unknown } | undefined)?.coordinates
        ?? realEstate?.location

    // GeoJSON shape: coordinates: [longitude, latitude]
    if (Array.isArray(rawCoordinates) && rawCoordinates.length >= 2) {
        const longitude = rawCoordinates[0]
        const latitude = rawCoordinates[1]

        if (
            typeof latitude === "number"
            && typeof longitude === "number"
            && Number.isFinite(latitude)
            && Number.isFinite(longitude)
        ) {
            return { latitude, longitude }
        }
    }

    if (rawCoordinates && typeof rawCoordinates === "object") {
        const candidate = rawCoordinates as { latitude?: number; longitude?: number }
        const latitude = candidate.latitude
        const longitude = candidate.longitude

        if (
            typeof latitude === "number"
            && typeof longitude === "number"
            && Number.isFinite(latitude)
            && Number.isFinite(longitude)
        ) {
            return { latitude, longitude }
        }
    }

    return null
}

const FitMapToMarkers = ({ markers }: { markers: MarkerData[] }) => {
    const map = useMap()

    useEffect(() => {
        if (markers.length === 0) return

        const bounds = markers.map((marker) => [marker.latitude, marker.longitude] as [number, number])
        map.fitBounds(bounds, { padding: [24, 24] })
    }, [map, markers])

    return null
}

const RefreshMapSize = () => {
    const map = useMap()

    useEffect(() => {
        const invalidate = () => map.invalidateSize()

        // Ensure the map is measured correctly after first paint/layout.
        const frame = window.requestAnimationFrame(invalidate)
        window.addEventListener("resize", invalidate)

        const container = map.getContainer()
        const resizeObserver = new ResizeObserver(() => {
            invalidate()
        })
        resizeObserver.observe(container)

        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener("resize", invalidate)
            resizeObserver.disconnect()
        }
    }, [map])

    return null
}

export const RealEstateMap = ({ advertisements }: Props) => {
    const navigate = useNavigate()
    const closePopupTimeouts = useRef<Record<string, number>>({})

    const clearCloseTimeout = (markerId: string) => {
        const timeoutId = closePopupTimeouts.current[markerId]

        if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId)
            delete closePopupTimeouts.current[markerId]
        }
    }

    const scheduleClosePopup = (markerId: string, marker: LeafletMarker) => {
        clearCloseTimeout(markerId)

        closePopupTimeouts.current[markerId] = window.setTimeout(() => {
            marker.closePopup()
            delete closePopupTimeouts.current[markerId]
        }, 140)
    }

    useEffect(() => {
        return () => {
            Object.values(closePopupTimeouts.current).forEach((timeoutId) => {
                window.clearTimeout(timeoutId)
            })
        }
    }, [])

    const markers = advertisements
        .map((ad) => {
            const coordinates = extractCoordinates(ad)

            if (coordinates === null) {
                return null
            }

            const parsedPrice = Number(ad.price)

            return {
                id: String(ad.id),
                price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                photos: ad.photos,
            }
        })
        .filter((marker): marker is NonNullable<typeof marker> => marker !== null)

    return (
        <MapContainer
            center={[40.8518, 14.2681]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
        >
            <RefreshMapSize />
            <FitMapToMarkers markers={markers} />

            <TileLayer
                url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`}
            />

            <MarkerClusterGroup>
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={[marker.latitude, marker.longitude]}
                        icon={createPriceIcon(marker.price)}
                        eventHandlers={{
                            mouseover: (event) => {
                                clearCloseTimeout(marker.id)
                                event.target.openPopup()
                            },
                            mouseout: (event) => {
                                scheduleClosePopup(marker.id, event.target)
                            },
                            popupopen: (event) => {
                                const popupElement = event.target.getPopup()?.getElement()

                                if (!popupElement) return

                                popupElement.onmouseenter = () => {
                                    clearCloseTimeout(marker.id)
                                }

                                popupElement.onmouseleave = () => {
                                    scheduleClosePopup(marker.id, event.target)
                                }
                            },
                            click: () => navigate(`/account/advertisement/${marker.id}`)
                        }}
                    >
                        <Popup
                            closeButton={false}
                            autoClose={false}
                            closeOnClick={false}
                            className="real-estate-marker-popup"
                        >
                            <MarkerHoverCard
                                photos={marker.photos}
                                price={marker.price}
                            />
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}