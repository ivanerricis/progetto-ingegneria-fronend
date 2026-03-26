import { isAxiosError } from "axios"
import { apiClient } from "./config"
import { formatLocalDate } from "@/utils/formatLocalDate"

export async function updateAccountPassword(
    accountId: string | number,
    data: {
        currentPassword: string
        newPassword: string
    }
) {
    try {
        const response = await apiClient.patch(`/account/${accountId}/password`, data)
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

export async function CreateAppointment(date: Date, selectedTime: string, advertisementId: string | number) {
    try {
        const formattedDate = formatLocalDate(date);
        const response = await apiClient.post(`/advertisement/create_appointment/${advertisementId}`, {
            date: formattedDate,
            time: selectedTime,
        });

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile creare l'appuntamento"
            throw new Error(message)
        }

        throw error
    }
}

export async function CancelAppointment(appointmentId: string | number) {
    try {
        const response = await apiClient.patch(`/appointment/accounts/${appointmentId}/cancel`);

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile annullare l'appuntamento"
            throw new Error(message)
        }

        throw error
    }
}

export async function CreateOffer(advertisementId: string | number, price: number) {

    try {
        const response = await apiClient.post(`/advertisement/create_offer/${advertisementId}`, { price },);

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile creare l'offerta"
            throw new Error(message)
        }

        throw error
    }
}

export async function AcceptOffer(offerId: number) {
    try {
        const response = await apiClient.post(`/offer/accounts/${offerId}/accept`);

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile confermare l'offerta"
            throw new Error(message)
        }

        throw error
    }
}

export async function RejectOffer(offerId: number) {
    try {
        const response = await apiClient.post(`/offer/accounts/${offerId}/reject`);

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile rifiutare l'offerta"
            throw new Error(message)
        }

        throw error
    }
}

export async function CounterOffer(advertisementId: number, price: number) {
    try {
        const response = await apiClient.post(`/offer/accounts/${advertisementId}/offer/counter`, { price });

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Impossibile creare l'offerta"
            throw new Error(message)
        }

        throw error
    }
}