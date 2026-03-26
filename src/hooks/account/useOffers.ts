import { useCallback, useEffect, useState } from "react";
import { isCancel } from "axios";
import { apiClient } from "@/lib/api/config";
import type { Offer } from "@/types/types";
import { AcceptOffer, RejectOffer } from "@/lib/api/account";

export default function useOffers(
    advertisementId?: number,
    agentId?: number
) {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOffers = useCallback(async (signal?: AbortSignal) => {
        if (!advertisementId || !agentId) return;
        setError(null)
        setIsLoading(true)

        try {
            const { data } = await apiClient.get(
                `/account/negotiations/${advertisementId}/${agentId}`, { signal }
            );

            setOffers(data.offers);
            console.log("Fetched offers:", data.offers);
        } catch (error) {
            if (isCancel(error)) return
            setError(error instanceof Error ? error.message : "Errore")
        } finally {
            setIsLoading(false)
        }
    }, [advertisementId, agentId]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchOffers(abortController.signal);
        return () => abortController.abort();
    }, [fetchOffers]);

    const acceptOffer = async (id: number) => {
        await AcceptOffer(id)

        setOffers(prev => prev.filter(a => a.id !== id))
    }

    const rejectOffer = async (id: number) => {
        await RejectOffer(id)

        setOffers(prev => prev.filter(a => a.id !== id))
    }

    return {
        offers,
        isLoading,
        error,
        refetch: fetchOffers,
        acceptOffer,
        rejectOffer,
    };
}