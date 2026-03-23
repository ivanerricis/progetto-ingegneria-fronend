/**
 * Formats a date string into a human-readable format that includes both the date and time.
 * The output is localized to Italian ("it-IT") and uses a medium date style and short time style.
 * @param date The date string to format. This should be a valid date string that can be parsed by the JavaScript Date constructor.
 * @returns A formatted date and time string in the format "dd MMM yyyy, HH:mm" (e.g., "25 Mar 2024, 14:30") or a placeholder ("-") if the input is invalid.
 */
export const formatDaysTimes = (date: string) => {

    return new Date(date).toLocaleString("it-IT", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}