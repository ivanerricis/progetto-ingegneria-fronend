export type Advertisement = {
    id: string | number
    title: string
    description: string
    agent: Agent
    photos: Photo[]
    price: string | number
    realEstate: RealEstate
    type: "sale" | "rent"
    status: "active" | "sold" | "rented"
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

export type Agent = {
    id: string | number
    firstName: string
    lastName: string
    phoneNumber: string
    agency: Agency
}

export type Agency = {
    id: string | number
    name: string
    phoneNumber: string
    email: string
}

export type Logo = {
    id: string | number
    format: string
    url: string
    agency: Agency
}