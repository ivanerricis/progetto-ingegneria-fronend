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

export default function FileUpload() {
    const [files, setFiles] = React.useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    });

    const filesList = files.map((file) => (
        <li key={file.name} className="relative">
            <Card className="relative aspect-square">
                <div className="absolute right-3 top-3">
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        aria-label="Remove file"
                        onClick={() =>
                            setFiles((prevFiles) =>
                                prevFiles.filter((prevFile) => prevFile.name !== file.name)
                            )
                        }
                    >
                        <Trash className="h-4 w-4" aria-hidden={true} />
                    </Button>
                </div>
                <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-0 text-center">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                        <FileIcon className="h-5 w-5 text-foreground" aria-hidden={true} />
                    </span>
                    <div className="min-w-0 w-full px-2">
                        <p className="truncate text-sm text-foreground" title={file.name}>
                            {file.name}
                        </p>
                        <p className="text-pretty mt-0.5 text-sm text-muted-foreground">
                            {file.size} bytes
                        </p>
                    </div>
                </CardContent>
            </Card>
        </li>
    ));

    return (
        <div className="flex items-center justify-center">
            <form action="#" method="post">
                <Label htmlFor="file-upload-2" className="text-xl">
                    Carica le foto della casa
                </Label>
                <div className="w-full mt-2 flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="w-full flex-1">
                        <div
                            {...getRootProps()}
                            className={cn(
                                isDragActive
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                    : "border-border",
                                "flex justify-center rounded-md border border-dashed px-6 py-20 transition-colors duration-200"
                            )}
                        >
                            <div>
                                <FileIcon
                                    className="mx-auto h-12 w-12 text-muted-foreground/80"
                                    aria-hidden={true}
                                />
                                <div className="mt-4 flex text-muted-foreground">
                                    <p className="text-nowrap">Trascina e rilascia oppure</p>
                                    <label
                                        htmlFor="file"
                                        className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:text-primary/80 hover:underline hover:underline-offset-4"
                                    >
                                        <span className="text-nowrap">scegli i file</span>
                                        <input
                                            {...getInputProps()}
                                            id="file-upload-2"
                                            name="file-upload-2"
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1 text-nowrap">da caricare</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {filesList.length > 0 && (
                        <div className="w-full">
                            <h4 className="text-balance font-medium text-foreground">
                                File caricati
                            </h4>
                            <ul
                                role="list"
                                className="mt-4 grid grid-cols-3 gap-2"
                            >
                                {filesList}
                            </ul>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
