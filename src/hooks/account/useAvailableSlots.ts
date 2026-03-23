import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/config";
import { isCancel } from "axios";

/**
 * Hook for fetching the available time slots for a specific advertisement on a given date. Handles loading and error states.
 * @param advertisementId The ID of the advertisement to fetch available slots for. If not provided, the hook will not attempt to fetch data and will return an empty list of slots.
 * @param date The date for which to fetch available slots. If not provided, the hook will not attempt to fetch data and will return an empty list of slots.
 * @returns An object containing the list of available slots, loading state, and error message (if any).
 */
export function useAvailableSlots(advertisementId?: string | number, date?: Date) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!advertisementId || !date) {
      setSlots([]);
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

        setSlots(Array.isArray(data) ? data : data?.slots ?? []);
      } catch (err) {
        if (isCancel(err)) return;

        setError("Errore nel caricamento degli orari disponibili");
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();

    return () => controller.abort();
  }, [advertisementId, date]);

  return { slots, loading, error };
}
