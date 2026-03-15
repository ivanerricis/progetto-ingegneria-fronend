import { useCallback, useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Photo } from "@/types/types"
import { formatPrice } from "@/utils/formatPrice"
import type { UseEmblaCarouselType } from "embla-carousel-react"

type CarouselApi = UseEmblaCarouselType[1]

type MarkerHoverCardProps = {
    photos?: Photo[]
    price: number
}

export const MarkerHoverCard = ({ photos = [], price }: MarkerHoverCardProps) => {
    const slides = photos
        .filter((photo) => typeof photo.url === "string" && photo.url.trim() !== "")
        .sort((leftPhoto, rightPhoto) => leftPhoto.position - rightPhoto.position)

    const [api, setApi] = useState<CarouselApi>()
    const [currentSlide, setCurrentSlide] = useState(1)

    const onSelect = useCallback((emblaApi: CarouselApi) => {
        if (!emblaApi) return
        setCurrentSlide(emblaApi.selectedScrollSnap() + 1)
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
        <div className="w-60 overflow-hidden rounded-md border bg-card text-card-foreground shadow-md">
            <Carousel setApi={setApi} className="aspect-4/3 w-full overflow-hidden **:data-[slot=carousel-content]:h-full">
                <CarouselContent className="ml-0 h-full">
                    {slides.length === 0 ? (
                        <CarouselItem className="h-full basis-full pl-0">
                            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-sm">
                                Immagine non presente
                            </div>
                        </CarouselItem>
                    ) : (
                        slides.map((photo) => (
                            <CarouselItem key={String(photo.id)} className="h-full basis-full pl-0">
                                <img
                                    src={photo.url}
                                    alt="Immagine immobile"
                                    className="block h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>

                {slides.length > 1 && (
                    <>
                        <CarouselPrevious className="left-2 size-7 bg-background/90" />
                        <CarouselNext className="right-2 size-7 bg-background/90" />
                        <div className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-black/55 px-2 py-0.5 text-xs text-white">
                            {currentSlide} / {slides.length}
                        </div>
                    </>
                )}
            </Carousel>

            <div className="border-t px-3 py-2 text-lg font-semibold">
                {formatPrice(price)}
            </div>
        </div>
    )
}
