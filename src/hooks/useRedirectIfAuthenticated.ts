// src/hooks/useRedirectIfAuthenticated.ts
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiClient } from "@/lib/api/config"

type Priority = "account" | "agent"

export const useRedirectIfAuthenticated = (priority: Priority = "account") => {
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true

        const checks: Array<{ endpoint: string; redirect: string }> =
            priority === "account"
                ? [
                    { endpoint: "/auth/account", redirect: "/homepage" },
                    { endpoint: "/auth/agent", redirect: "/agent/dashboard" },
                ]
                : [
                    { endpoint: "/auth/agent", redirect: "/agent/dashboard" },
                    { endpoint: "/auth/account", redirect: "/homepage" },
                ]

        const run = async () => {
            for (const { endpoint, redirect } of checks) {
                try {
                    await apiClient.get(endpoint)
                    if (isMounted) navigate(redirect, { replace: true })
                    return
                } catch {
                    // try next
                }
            }
        }

        void run()

        return () => { isMounted = false }
    }, [navigate, priority])
}