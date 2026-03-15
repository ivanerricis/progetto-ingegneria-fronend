"use client";

import { File as FileIcon, Trash } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function FileUpload() {
    const MAX_FILES = 10;
    const [files, setFiles] = React.useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            const remainingSlots = MAX_FILES - files.length;

            if (remainingSlots <= 0) {
                toast.error(`Puoi caricare al massimo ${MAX_FILES} foto.`);
                return;
            }

            if (acceptedFiles.length > remainingSlots) {
                toast.error(`Puoi caricare al massimo ${MAX_FILES} foto.`);
            }

            const nextFiles = [...files, ...acceptedFiles.slice(0, remainingSlots)];
            setFiles(nextFiles);
        },
    });

    const formatFileSizeInMb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    const filesList = files.map((file) => (
        <Card className="relative rounded-sm p-0">
            <CardContent className="flex items-center justify-center gap-3 p-3 text-center">
                <span className="hidden sm:flex h-8 w-8 xl:h-10 xl:w-10 shrink-0 items-center justify-center rounded-sm bg-muted">
                    <FileIcon className="h-5 w-5 xl:h-6 xl:w-6 text-foreground" aria-hidden={true} />
                </span>
                <div className="min-w-0 w-full">
                    <p className="truncate text-sm text-foreground" title={file.name}>
                        {file.name}
                    </p>
                    <p className="text-pretty text-sm text-muted-foreground">
                        {formatFileSizeInMb(file.size)}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="destructive"
                    aria-label="Remove file"
                    className="rounded-sm"
                    onClick={() =>
                        setFiles((prevFiles) =>
                            prevFiles.filter((prevFile) => prevFile.name !== file.name)
                        )
                    }
                >
                    <Trash aria-hidden={true} />
                </Button>
            </CardContent>
        </Card>
    ));

    return (
        <div className="flex items-center justify-center">
            <form action="#" method="post" className="w-full">
                <Label htmlFor="file-upload-2" className="text-2xl">
                    Carica le foto della casa
                </Label>
                <div className="w-full mt-2 flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="w-full sm:w-1/3">
                        <div
                            {...getRootProps()}
                            className={cn(
                                isDragActive
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                    : "border-border",
                                "flex justify-center items-center p-10 sm:h-91 rounded-sm border border-dashed transition-colors duration-200"
                            )}
                        >
                            <div>
                                <FileIcon
                                    className="mx-auto h-12 w-12 text-muted-foreground/80"
                                    aria-hidden={true}
                                />
                                <div className="mt-4 flex sm:flex-col text-muted-foreground">
                                    <p className="text-nowrap sm:text-lg">Trascina e rilascia oppure</p>
                                    <div className="flex">
                                        <label
                                            htmlFor="file"
                                            className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:text-primary/80 hover:underline hover:underline-offset-4"
                                        >
                                            <span className="text-nowrap sm:text-lg">scegli i file</span>
                                            <input
                                                {...getInputProps()}
                                                id="file-upload-2"
                                                name="file-upload-2"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="pl-1 text-nowrap sm:text-lg">da caricare</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {filesList.length > 0 && (
                        <div className="w-full sm:w-2/3 grid grid-cols-2 xl:grid-cols-2 gap-2">
                            {filesList}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
