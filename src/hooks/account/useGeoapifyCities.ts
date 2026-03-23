import { useState, useCallback, useRef } from "react"

export interface CityOption {
    label: string
    value: string
    lat: number
    lon: number
    country: string
}

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY

/**
 * Hook for fetching city suggestions from the Geoapify API based on a search query.
 * Handles loading state and allows for cancellation of ongoing requests when a new search is initiated.
 * @returns An object containing the list of city suggestions, loading state, a function to search for cities based on a query, and a function to clear the suggestions.
 */
export const useGeoapifyCities = () => {
    const [suggestions, setSuggestions] = useState<CityOption[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    const searchCities = useCallback(async (query: string) => {
        if (!query || query.trim().length < 2) {
            setSuggestions([])
            return
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        abortControllerRef.current = new AbortController()
        setIsLoading(true)

        try {
            const url = new URL("https://api.geoapify.com/v1/geocode/autocomplete")
            url.searchParams.set("text", query.trim())
            url.searchParams.set("type", "city")
            url.searchParams.set("filter", "countrycode:it")
            url.searchParams.set("lang", "it")
            url.searchParams.set("limit", "5")
            url.searchParams.set("apiKey", GEOAPIFY_API_KEY)

            const response = await fetch(url.toString(), {
                signal: abortControllerRef.current.signal,
            })

            if (!response.ok) throw new Error("Errore nella ricerca")

            const data = await response.json()

            const cities: CityOption[] = (data.features ?? [])
                .filter((feature: any) => feature.properties?.city || feature.properties?.name)
                .map((feature: any) => {
                    const props = feature.properties
                    const cityName = props.city ?? props.name
                    const region = props.state ?? props.county ?? ""
                    return {
                        label: region ? `${cityName}, ${region}` : cityName,
                        value: cityName,
                        lat: props.lat,
                        lon: props.lon,
                        country: props.country ?? "Italia",
                    }
                })

            setSuggestions(cities)
        } catch (submitError) {
            if(!(submitError instanceof Error)) return
            if (submitError.message !== "AbortError") {
                setSuggestions([])
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearSuggestions = useCallback(() => setSuggestions([]), [])

    return { suggestions, isLoading, searchCities, clearSuggestions }
}