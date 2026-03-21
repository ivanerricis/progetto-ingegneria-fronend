import FileUpload from "@/pages/Agent/dashboard/advertisement/components/fileUpload";
import type { FC } from "react";

interface StepPhotoProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
}

const StepPhoto: FC<StepPhotoProps> = ({ files, onFilesChange }) => (
    <div className="flex flex-col gap-4">
        <FileUpload files={files} onFilesChange={onFilesChange} />
    </div>
);

export default StepPhoto;