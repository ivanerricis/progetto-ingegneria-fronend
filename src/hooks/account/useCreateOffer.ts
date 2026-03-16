import { useState } from "react";
import { apiClient } from "@/lib/api/config";

export default function useCreateOffer() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createOffer = async (advertisementId: number, price: number, signal?: AbortSignal) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await apiClient.post(
                `/advertisement/create_offer/${advertisementId}`,
                { price },
                signal ? { signal } : undefined
            );
            setSuccess(true);
            return response.data;
        } catch (error: any) {
            setError(error.response.data.error || "Errore nell'invio dell'offerta");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { createOffer, isLoading, error, success };
}
