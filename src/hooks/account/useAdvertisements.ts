import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Advertisement } from "@/types/types";
import { apiClient } from "@/lib/api/config";

const useAdvertisements = () => {
    const [searchParams] = useSearchParams();
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const fetchAdvertisements = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();

                searchParams.forEach((value, key) => {
                    if (!value) return;
                    if (key === "cityLat" || key === "cityLon") return;
                    if (key === "page" || key === "size") return;
                    params.set(key, value);
                });

                // mapping coordinate
                const cityLat = searchParams.get("cityLat");
                const cityLon = searchParams.get("cityLon");
                if (cityLat) params.set("lat", cityLat);
                if (cityLon) params.set("lon", cityLon);

                // pagination mapping - CONVERTI A 1-INDEXED PER IL BACKEND
                const page = Number(searchParams.get("page") ?? "0");
                const size = Number(searchParams.get("size") ?? "10");

                const backendPage = page + 1;
                const skip = page * size;
                const take = size;

                params.set("page", String(backendPage));
                params.set("take", String(take));
                params.set("skip", String(skip));

                const queryString = params.toString();
                const url = `/account/advertisements${queryString ? `?${queryString}` : ""}`;

                const response = await apiClient.get(url, {
                    signal: controller.signal,
                });

                if (Array.isArray(response.data)) {
                    setAdvertisements(response.data);
                    setTotalPages(1);
                    setTotalElements(response.data.length);
                } else {
                    setAdvertisements(response.data.items ?? []);
                    setTotalPages(response.data.pagination.totalPages ?? 1);
                    setTotalElements(response.data.pagination.total ?? 0);
                }
            } catch (err: any) {
                if (err.name !== "AbortError" && err.name !== "CanceledError") {
                    setError("Errore nel caricamento degli annunci.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdvertisements();
        return () => controller.abort();
    }, [searchParams]);

    return { advertisements, isLoading, error, totalPages, totalElements };
};

export default useAdvertisements;