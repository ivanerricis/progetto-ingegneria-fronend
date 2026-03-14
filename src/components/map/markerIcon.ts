import { formatPrice } from "@/utils/formatPrice"
import L from "leaflet"

export const createPriceIcon = (price: number) =>
    L.divIcon({
        className: "real-estate-price-icon",
        html: `
      <div class="real-estate-price-icon__badge">
        <div class="real-estate-price-icon__price">${formatPrice(price)}</div>
      </div>
    `,
        iconSize: [220, 44],
        iconAnchor: [110, 22],
    })