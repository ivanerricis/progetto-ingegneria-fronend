type PreviewPhotoProps = {
    photo: string
}

export const PreviewPhoto = ({ photo }: PreviewPhotoProps) => {

    return (
        <div className="flex items-center justify-center">
            <img
                src={photo}
                alt="Immagine immobile"
                className="block w-92 h-60 object-cover rounded-t-sm"
                loading="lazy"
            />
        </div>
    );
}