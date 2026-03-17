import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useGeoapifyCities, type CityOption } from "@/hooks/account/useGeoapifyCities"
import { Loader2, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CitySearchInputProps {
    value: string
    onCitySelect: (city: CityOption | null) => void
    placeholder?: string
    className?: string
}

export const CitySearchInput = ({
    value,
    onCitySelect,
    placeholder = "Cerca città...",
    className,
}: CitySearchInputProps) => {
    const [inputValue, setInputValue] = useState(value)
    const [isOpen, setIsOpen] = useState(false)
    const { suggestions, isLoading, searchCities, clearSuggestions } = useGeoapifyCities()
    const containerRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        setInputValue(value)
    }, [value])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInputValue(val)

        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (!val.trim()) {
            clearSuggestions()
            setIsOpen(false)
            onCitySelect(null)
            return
        }

        debounceRef.current = setTimeout(() => {
            searchCities(val)
            setIsOpen(true)
        }, 300)
    }

    const handleSelect = (city: CityOption) => {
        setInputValue(city.label)
        clearSuggestions()
        setIsOpen(false)
        onCitySelect(city)
    }

    const handleClear = () => {
        setInputValue("")
        clearSuggestions()
        setIsOpen(false)
        onCitySelect(null)
    }

    return (
        <div ref={containerRef} className={cn("relative w-full h-full", className)}>
            <div className="relative h-full!">
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                    placeholder={placeholder}
                    className="pr-8 h-full text-lg!"
                    autoComplete="off"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {!isLoading && inputValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Cancella ricerca"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-9999 w-fit -left-12 sm:left-0 rounded-sm border bg-popover shadow-md">
                    {suggestions.map((city) => (
                        <li key={`${city.lat}-${city.lon}`}>
                            <Button
                                type="button"
                                variant={"ghost"}
                                className="flex w-full rounded-sm! justify-start items-center gap-2 px-2! py-2 text-sm"
                                onClick={() => handleSelect(city)}
                            >
                                <MapPin className="size-5 shrink-0 text-foreground" />
                                <Label className="text-lg">{city.label}</Label>
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}