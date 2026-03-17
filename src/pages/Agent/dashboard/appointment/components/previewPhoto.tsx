type PreviewPhotoProps = {
    photo: string
}

export const PreviewPhoto = ({ photo }: PreviewPhotoProps) => {

    return (
        <div className="w-full h-full flex items-center justify-center">
            <img
                src={photo}
                alt="Immagine immobile"
                className="block h-full w-full object-cover rounded-t-sm sm:rounded-t-none sm:rounded-l-sm"
                loading="lazy"
            />
        </div>
    );
}