import { isAxiosError } from "axios"
import { apiClient } from "./config"

export async function updateAgentPassword(
    agentId: string | number,
    data: {
        currentPassword: string
        newPassword: string
    }
) {
    try {
        const response = await apiClient.patch(`/agent/${agentId}/password`, data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Aggiornamento password non riuscito"
            throw new Error(message)
        }
        throw err
    }
}

export async function ConfirmAppointment(appointmentId: string | number) {
    try {
        const response = await apiClient.patch(`/appointment/agents/${appointmentId}/confirm`);

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile confermare l'appuntamento"
            throw new Error(message)
        }

        throw error
    }
}

export async function RejectAppointment(appointmentId: string | number) {
    try {
        const response = await apiClient.patch(`/appointment/agents/${appointmentId}/reject`);

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile rifiutare l'appuntamento"
            throw new Error(message)
        }

        throw error
    }
}

export async function CreateAdvertisement(data: {
    description: string
    price: number
    propertyType: string
    type: "sale" | "rent"
    address: string
    size: number
    rooms: number
    bathrooms: number
    floor: number
    energyClass: string
    hasElevator: boolean
    hasParking: boolean
    hasGarden: boolean
    hasBalcony: boolean
    hasGarage: boolean
    hasFurnished: boolean
    hasAirConditioning: boolean
    hasSolarPanels: boolean
}) {
    try {
        const response = await apiClient.post(`/agent/create_advertisement`, data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Creazione annuncio non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function DeleteAdvertisement(advertisementId: string | number) {
    try {
        const response = await apiClient.delete(`/advertisement/delete/${advertisementId}`)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Eliminazione annuncio non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function CreateAgent(data: {
    firstName: string
    lastName: string
    phoneNumber: string
    isAdmin: boolean
}) {
    try {
        const response = await apiClient.post(`/agent/create_agent`, data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Creazione agente non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function DeleteAgent(agentId: string | number) {
    try {
        const response = await apiClient.delete(`/agent/delete/${agentId}`)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Eliminazione agente non riuscita"
            throw new Error(message)
        }
        throw err
    }
}