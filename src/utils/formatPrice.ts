/**
 * Formats a price value into a localized currency string in Italian format.
 * It handles various input formats, including those with different decimal and thousand separators,
 * and ensures that the output is properly formatted as a currency string in Euros (EUR) without decimal places.
 * @param price The price value to format, which can be a string or a number. The function will attempt to normalize the input by removing thousand separators and standardizing the decimal separator before formatting it as currency.
 * @returns A formatted price string in the format "€ 1.234" for valid numeric inputs, or the original input string if it cannot be parsed as a valid number.
 */
export const formatPrice = (price: string | number) => {
    const rawValue = String(price).trim()
    const normalizedValue = rawValue
        .replaceAll(/\./g, "")
        .replaceAll(",", ".")
        .replaceAll(/[^\d.-]/g, "")

    const numericValue = Number(normalizedValue)

    if (!Number.isFinite(numericValue)) {
        return rawValue;
    }

    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue)
}