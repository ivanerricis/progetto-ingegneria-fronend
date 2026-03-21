export type Advertisement = {
    id: number
    title: string
    description: string
    agent: Agent
    photos: Photo[]
    previewPhoto: Photo
    price: string | number
    realEstate: RealEstate
    type: "sale" | "rent"
    status: "active" | "sold" | "rented"
}

export type Appointment = {
    id: string | number
    appointmentAt: Date
    status: "requested" | "confirmed" | "rejected" | "cancelled"
    client: Account
    advertisement: Advertisement
    agent: Agent
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
    coordinates?: {
        latitude: number
        longitude: number
    }
    location?: {
        type: string
        coordinates: [number, number]
    }
    airConditioning: boolean
    balcony: boolean
    concierge: boolean
    elevator: boolean
    energyClass: string
    furnished: boolean
    garage: boolean
    garden: boolean
    heating: boolean
    parking: boolean
    solarPanels: boolean
    terrace: boolean
    housetype: string
    rooms: number
    size: number
    floor: number
    bathrooms: number
}

export type Agent = {
    id: string | number
    firstName: string
    lastName: string
    phoneNumber: string
    username: string
    createdAt: Date
    agency: Agency
    isPasswordChange: boolean
}

export type Agency = {
    id: string | number
    name: string
    phoneNumber: string
    email: string
    logo: Logo
}

export type Logo = {
    id: string | number
    format: string
    url: string
    agency: Agency
}
export type Account = {
    id: string | number
    firstName: string
    lastName: string
    email: string
    createdAt: Date
}

export type Offer = {
    id: string | number
    createdAt: Date
    price: number
    status: "pending" | "accepted" | "rejected"
    madeBy: Account | Agent
    advertisement: Advertisement
    account: Account
}

export type Services = {
    ariaCondizionata: boolean;
    balcone: boolean;
    portineria: boolean;
    ascensore: boolean;
    piano: boolean;
    arredata: boolean;
    garage: boolean;
    giardino: boolean;
    riscaldamenti: boolean;
    postoAuto: boolean;
    pannelliSolari: boolean;
    terrazzo: boolean;
};

export type AddressData = {
    street: string;
    housenumber: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    lat: number | null;
    lon: number | null;
};