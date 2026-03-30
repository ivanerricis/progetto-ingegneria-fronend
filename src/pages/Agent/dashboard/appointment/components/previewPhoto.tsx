type PreviewPhotoProps = {
    photo: string
}

export const PreviewPhoto = ({ photo }: PreviewPhotoProps) => {

    return (
        <div className="flex items-center justify-center w-full">
            <img
                src={photo}
                alt="Immagine immobile"
                className="block w-full sm:w-md sm:h-60 object-cover rounded-t-sm"
                loading="lazy"
            />
        </div>
    );
}