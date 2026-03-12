import axios from "axios"
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Credenziali non valide"
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
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
        if (axios.isAxiosError(err)) {
            const message =
                err.response?.data?.error ??
                err.response?.data?.message ??
                "Logout non riuscito"
            throw new Error(message)
        }
        throw err
    }
}