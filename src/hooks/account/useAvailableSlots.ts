import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/config";

export function useAvailableTimes(advertisementId?: string | number, date?: Date) {
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!advertisementId || !date) {
      setTimes([]);
      return;
    }

    const controller = new AbortController();

    const fetchTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const formattedDate = date.toISOString().split("T")[0];

        const { data } = await apiClient.get(
          `/advertisement/available_slots/${advertisementId}/${formattedDate}`,
          {
            params: { date: formattedDate },
            signal: controller.signal
          }
        );

        setTimes(Array.isArray(data) ? data : data?.slots ?? []);
      } catch (err: any) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;

        setError(err.message || "Errore nel caricamento degli orari disponibili");
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();

    return () => controller.abort();
  }, [advertisementId, date]);

  return { times, loading, error };
}
