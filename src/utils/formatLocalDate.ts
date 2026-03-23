/**
 * Formats a date into a local date string in the format "yyyy-MM-dd".
 * @param d The date to format.
 * @returns A formatted date string in the format "yyyy-MM-dd".
 */
export const formatLocalDate = (d: Date) => 
    `${d.getFullYear()}-${String(d.getMonth() +
        1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;