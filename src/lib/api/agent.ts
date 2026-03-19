import axios from "axios"
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Aggiornamento password non riuscito"
            throw new Error(message)
        }
        throw err
    }
}