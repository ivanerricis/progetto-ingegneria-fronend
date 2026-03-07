export const formatPrice = (price: string | number) => {
    const rawValue = String(price).trim()
    const normalizedValue = rawValue
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, "")

    const numericValue = Number(normalizedValue)

    if (!Number.isFinite(numericValue)) {
        return rawValue
    }

    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue)
}