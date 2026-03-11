import { useState, useEffect, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import sfondo from "@/assets/sfondo.jpg"
import type { Photo } from "@/types/types"
import type { UseEmblaCarouselType } from "embla-carousel-react"

type CarouselApi = UseEmblaCarouselType[1]

type RealEstateCarouselProps = {
    photos?: Photo[]
}

const RealEstateCarousel = ({ photos = [] }: RealEstateCarouselProps) => {
    const normalizedPhotos = photos
        .filter((photo) => typeof photo.url === "string" && photo.url.trim() !== "")
        .sort((a, b) => a.position - b.position)

    const slides = normalizedPhotos.length > 0 ? normalizedPhotos : [{ id: "fallback", url: sfondo, position: 0, format: "jpg" }]

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(1)
    const count = slides.length

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return
        setCurrent(api.selectedScrollSnap() + 1)
    }, [])

    useEffect(() => {
        if (!api) return
        onSelect(api)
        api.on("select", onSelect)
        api.on("reInit", onSelect)
        return () => {
            api.off("select", onSelect)
            api.off("reInit", onSelect)
        }
    }, [api, onSelect])

    return (
        <Carousel setApi={setApi} className="h-full w-full overflow-hidden rounded-t-md sm:rounded-t-none sm:rounded-l-md **:data-[slot=carousel-content]:h-full">
            <CarouselContent className="ml-0 h-full">
                {slides.map((photo) => (
                    <CarouselItem key={String(photo.id)} className="h-full basis-full pl-0">
                        <img
                            src={photo.url}
                            alt="Immagine immobile"
                            className="block h-full w-full object-cover"
                            loading="lazy"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
            {count > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-sm pointer-events-none">
                    {current} / {count}
                </div>
            )}
        </Carousel>
    )
}

export default RealEstateCarousel