type DateInput = string | number | Date | null | undefined

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
