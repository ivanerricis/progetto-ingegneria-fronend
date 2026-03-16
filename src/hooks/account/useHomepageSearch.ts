import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import type { CityOption } from "@/hooks/account/useGeoapifyCities"

export const useHomepageSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev)
                for (const [key, value] of Object.entries(updates)) {
                    if (value === null || value === "" || value === undefined) {
                        next.delete(key)
                    } else {
                        next.set(key, value)
                    }
                }
                next.set("page", "0")
                return next
            })
        },
        [setSearchParams],
    )

    const setCity = useCallback(
        (city: CityOption | null) => {
            if (!city) {
                updateParams({ city: null, cityLat: null, cityLon: null })
            } else {
                updateParams({
                    city: city.value,
                    cityLat: String(city.lat),
                    cityLon: String(city.lon),
                })
            }
        },
        [updateParams],
    )

    const setFilter = useCallback(
        (key: string, value: string | null) => {
            updateParams({ [key]: value })
        },
        [updateParams],
    )

    const setPage = useCallback(
        (page: number) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev)
                next.set("page", String(page))
                return next
            })
        },
        [setSearchParams],
    )

    const clearFilters = useCallback(() => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            // Mantieni solo city, cityLat, cityLon
            const city = next.get("city")
            const cityLat = next.get("cityLat")
            const cityLon = next.get("cityLon")
            
            Array.from(next.keys()).forEach((key) => next.delete(key))
            
            if (city) next.set("city", city)
            if (cityLat) next.set("cityLat", cityLat)
            if (cityLon) next.set("cityLon", cityLon)
            
            next.set("page", "0")
            return next
        })
    }, [setSearchParams])

    const clearAll = useCallback(() => {
        setSearchParams(new URLSearchParams())
    }, [setSearchParams])

    return {
        searchParams,
        city: searchParams.get("city") ?? "",
        cityLat: searchParams.get("cityLat") ?? "",
        cityLon: searchParams.get("cityLon") ?? "",
        minPrice: searchParams.get("minPrice") ?? "",
        maxPrice: searchParams.get("maxPrice") ?? "",
        minSize: searchParams.get("minSize") ?? "",
        maxSize: searchParams.get("maxSize") ?? "",
        rooms: searchParams.get("rooms") ?? "",
        bathrooms: searchParams.get("bathrooms") ?? "",
        propertyType: searchParams.get("propertyType") ?? "",
        page: Number(searchParams.get("page") ?? "0"),
        sort: searchParams.get("sort") ?? "",
        setCity,
        setFilter,
        setPage,
        clearFilters,
        clearAll,
    }
}