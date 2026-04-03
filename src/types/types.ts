export type Advertisement = {
    id: number
    title: string
    description: string
    agent: Agent
    photos: Photo[]
    previewPhoto: string
    price: string | number
    realEstate: RealEstate
    type: "sale" | "rent"
    status: "active" | "sold" | "rented"
    pois: Poi[]
}

export type Poi = {
    id: number
    name: string
    type: string
    geoapifyPlaceId: string
    location: {
        type: string
        coordinates: [number, number]
    }
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
    furnished: boolean
    garage: boolean
    garden: boolean
    heating: boolean
    parking: boolean
    solarPanels: boolean
    terrace: boolean
    energyClass: string
    housetype: string
    rooms: number
    size: number
    floor: number
    bathrooms: number
}

export type Agent = {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    username: string
    createdAt: Date
    isPasswordChange: boolean
    isAdmin: boolean
    agency: Agency
    administrator: number | null
}

export type Agency = {
    id: number
    name: string
    phoneNumber: string
    email: string
    logo: Logo
}

export type Logo = {
    id: string | number
    format: string
    url: string
    agency?: Agency
}
export type Account = {
    id: number
    firstName: string
    lastName: string
    email: string
    password?: boolean
    createdAt: Date
    provider?: string
    providerAccountId?: string
}

export type Negotiation = {
    price: number
    status: "pending" | "accepted" | "rejected"
    advertisement: Advertisement
    account: Account
    lastOffer: Offer
    agent: Agent
}

export type Offer = {
    id: number
    createdAt: Date
    price: number
    status: "pending" | "accepted" | "rejected"
    madeBy: "ACCOUNT" | "AGENT"
    advertisement: Advertisement
    account: Account
    agent: Agent
}

export type Role = "AGENT" | "ACCOUNT";

export type Services = {
    ariaCondizionata: boolean;
    balcone: boolean;
    portineria: boolean;
    ascensore: boolean;
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