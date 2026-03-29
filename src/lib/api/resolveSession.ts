import { apiClient } from "@/lib/api/config"

export const resolveSession = async (): Promise<string | null> => {
    try {
        await apiClient.get("/auth/account")
        return "/homepage"
    } catch (error) {
        console.error("Error resolving session:", error)
    }

    try {
        await apiClient.get("/auth/agent")
        return "/agent/dashboard"
    } catch (error) {
        console.error("Error resolving session:", error)
    }
    return null
}