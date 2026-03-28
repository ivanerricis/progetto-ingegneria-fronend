import { useCallback, useEffect, useState } from "react";
import { isCancel } from "axios";
import { apiClient } from "@/lib/api/config";
import type { Offer, Role } from "@/types/types";
import { AcceptOffer as AgentAcceptOffer, RejectOffer as AgentRejectOffer } from "@/lib/api/agent";
import { AcceptOffer as AccountAcceptOffer, RejectOffer as AccountRejectOffer } from "@/lib/api/account";

export default function useOffers(
    role?: Role,
    advertisementId?: number,
    counterpartId?: number
) {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOffers = useCallback(async (signal?: AbortSignal) => {
        if (!role || !advertisementId || !counterpartId) return;
        setError(null);
        setIsLoading(true);

        try {
            const roleSegment = role === "AGENT" ? "agent" : "account";
            const { data } = await apiClient.get(
                `/${roleSegment}/negotiations/${advertisementId}/${counterpartId}`,
                { signal }
            );
            setOffers(data.offers);
        } catch (error) {
            if (isCancel(error)) return;
            setError(error instanceof Error ? error.message : "Errore");
        } finally {
            setIsLoading(false);
        }
    }, [role, advertisementId, counterpartId]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchOffers(abortController.signal);
        return () => abortController.abort();
    }, [fetchOffers]);

    const acceptOffer = async (id: number) => {
        await (role === "AGENT" ? AgentAcceptOffer(id) : AccountAcceptOffer(id));
        setOffers(prev => prev.filter(o => o.id !== id));
    };

    const rejectOffer = async (id: number) => {
        await (role === "AGENT" ? AgentRejectOffer(id) : AccountRejectOffer(id));
        setOffers(prev => prev.filter(o => o.id !== id));
    };

    return {
        offers,
        isLoading,
        error,
        refetch: fetchOffers,
        acceptOffer,
        rejectOffer,
    };
}