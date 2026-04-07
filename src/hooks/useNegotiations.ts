import { useCallback, useEffect, useState } from "react";
import { isCancel } from "axios";
import { apiClient } from "@/lib/api/config";
import type { Negotiation, Role } from "@/types/types";

export default function useNegotiations(role: Role) {
    const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNegotiations = useCallback(async (signal?: AbortSignal) => {
        setError(null);
        setIsLoading(true);

        try {
            const roleSegment = role === "AGENT" ? "agent" : "account";
            const { data } = await apiClient.get(`/${roleSegment}/negotiations`, {
                signal,
            });
            setNegotiations(data.items);
        } catch (error) {
            if (isCancel(error)) return;
            setError(error instanceof Error ? error.message : "Errore");
        } finally {
            setIsLoading(false);
        }
    }, [role]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchNegotiations(abortController.signal);
        return () => abortController.abort();
    }, [fetchNegotiations]);

    return { negotiations, isLoading, error, refetch: fetchNegotiations };
}