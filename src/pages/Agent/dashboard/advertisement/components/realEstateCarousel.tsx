import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Photo } from "@/types/types"

type RealEstateCarouselProps = {
    photos?: Photo[]
}

const RealEstateCarousel = ({ photos = [] }: RealEstateCarouselProps) => {
    const slides = photos
        .filter((photo) => typeof photo.url === "string" && photo.url.trim() !== "")
        .sort((a, b) => a.position - b.position)

    return (
        <Carousel className="h-full w-full overflow-hidden rounded-t-sm **:data-[slot=carousel-content]:h-full">
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
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    )
}

export default RealEstateCarousel