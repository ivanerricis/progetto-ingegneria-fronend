type DateInput = string | number | Date | null | undefined

/**
 * Formats a date input into a human-readable string in the format "dd/MM/yyyy".
 * If the input is null, undefined, an empty string, or an invalid date, it returns a placeholder ("-").
 * @param value The date input to format, which can be a string, number, Date object, null, or undefined.
 * @param locale Optional locale string for formatting the date (default is "it-IT").
 * @returns A formatted date string in the format "dd/MM/yyyy" or a placeholder ("-") if the input is invalid.
 */
export const formatCreatedAt = (value: DateInput, locale = "it-IT") => {
    if (value === null || value === undefined || value === "") {
        return "-"
    }

    const date = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "-"
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
}
