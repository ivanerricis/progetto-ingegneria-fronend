import { useEffect, useState } from "react";
import { isCancel } from "axios";
import { apiClient } from "@/lib/api/config";
import type { Negotiation, Role } from "@/types/types";

export default function useNegotiations(role: Role) {
    const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchNegotiations = async () => {
            setError(null);
            setIsLoading(true);

            try {
                const roleSegment = role === "AGENT" ? "agent" : "account";
                const { data } = await apiClient.get(`/${roleSegment}/negotiations`, {
                    signal: abortController.signal,
                });
                setNegotiations(data.items);
            } catch (error) {
                if (isCancel(error)) return;
                setError(error instanceof Error ? error.message : "Errore");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNegotiations();

        return () => abortController.abort();
    }, [role]);

    return { negotiations, isLoading, error };
}