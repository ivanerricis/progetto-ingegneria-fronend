import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/config";
import { isCancel } from "axios";

export function useAvailableDays(advertisementId?: string | number) {
  const [daysSet, setDaysSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!advertisementId) {
      return;
    }

    const controller = new AbortController();

    const fetchTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await apiClient.get(
          `/advertisement/available_days/${advertisementId}`,
          {
            signal: controller.signal
          }
        );

        setDaysSet(new Set(Array.isArray(data) ? data : data?.days ?? []));
      } catch (err) {
        if (isCancel(err)) return;
        setError("Errore nel caricamento degli orari disponibili");
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();

    return () => controller.abort();
  }, [advertisementId]);

  return { daysSet, loading, error };
}
