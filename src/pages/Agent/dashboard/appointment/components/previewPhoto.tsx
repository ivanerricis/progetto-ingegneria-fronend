import type { Photo } from "@/types/types";

type PreviewPhotoProps = {
    photo: Photo
}

export const PreviewPhoto = ({ photo }: PreviewPhotoProps) => {

    return (
        <div className="w-full h-full">
            <img
                src={photo.url}
                alt="Immagine immobile"
                className="block h-full w-full object-cover"
                loading="lazy"
            />
        </div>
    );
}