import { isAxiosError } from "axios"
import { apiClient } from "./config"

export async function registerAccount(data: {
    firstName: string
    lastName: string
    email: string
    password: string
}) {
    try {
        const response = await apiClient.post("/auth/account/register", data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Registrazione non valida"
            throw new Error(message)
        }
        throw err
    }
}

export async function loginAccount(data: {
    email: string
    password: string
}) {
    try {
        const response = await apiClient.post("/auth/account/login", data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Credenziali non valide"
            throw new Error(message)
        }
        throw err
    }
}

export async function loginAccountGoogle(token: string) {
    try {
        const response = await apiClient.post("/auth/account/google", { token })
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Login con Google non riuscito"
            throw new Error(message)
        }
        throw err
    }
}

export async function loginAgent(data: {
    username: string
    password: string
    agencyId: number
}) {
    try {
        const response = await apiClient.post("/auth/agent/login", data)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            console.log(err.response?.data.error.message)
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Credenziali non valide"
            throw new Error(message)
        }
        throw err
    }
}

export async function logoutAccount() {
    try {
        const response = await apiClient.post("/auth/account/logout")
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Logout non riuscito"
            throw new Error(message)
        }
        throw err
    }
}

export async function logoutAgent() {
    try {
        const response = await apiClient.post("/auth/agent/logout")
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Logout non riuscito"
            throw new Error(message)
        }
        throw err
    }
}

export async function deleteAccount(accountId: string | number) {
    try {
        const response = await apiClient.delete(`/account/delete/${accountId}`)
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Eliminazione account non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function requestResetPasswordAccount(email: string) {
    try {
        const response = await apiClient.post("/auth/account/forgot_password", { email })
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Richiesta di reset della password non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function resetPasswordAccount(token: string, newPassword: string) {
    try {
        const response = await apiClient.post("/auth/account/reset_password", { token, newPassword })
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Reset della password non riuscito"
            throw new Error(message)
        }
        throw err
    }
}

export async function requestResetPasswordAgent(username: string, agencyId: number) {
    try {
        const response = await apiClient.post("/auth/agent/forgot_password", { username, agencyId })
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Richiesta di reset della password non riuscita"
            throw new Error(message)
        }
        throw err
    }
}

export async function resetPasswordAgent(token: string, newPassword: string) {
    try {
        const response = await apiClient.post("/auth/agent/reset_password", { token, newPassword })
        return response.data
    } catch (err) {
        if (isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.error.message ??
                "Reset della password non riuscito"
            throw new Error(message)
        }
        throw err
    }
}