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