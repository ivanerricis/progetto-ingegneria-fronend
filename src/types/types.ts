export type Advertisement = {
    advertisementId?: string | number
    title: string
    description: string
    agencyName?: string
    photos: Photo[]
    price: string | number
    realEstate: RealEstate
}

export type Photo = {
    id: string | number
    format: string
    position: number
    url: string
}

export type RealEstate = {
    id: string | number
    addressFormatted: string
    addressInput: string
    airConditioning: boolean
    balcony: boolean
    concierge: boolean
    elevator: boolean
    energyClass: string
    floor: number
    furnished: boolean
    garage: boolean
    garden: boolean
    heating: boolean
    housetype: string
    parking: boolean
    rooms: number
    size: number
    solarPanels: boolean
    terrace: boolean
}