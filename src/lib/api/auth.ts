export async function loginAgent(apiBaseUrl: string, data: {
    username: string
    password: string
    agencyId: number
}) {
    const response = await fetch(`${apiBaseUrl}/auth/agent/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    const body = await response.json().catch(() => null)

    if (!response.ok) {
        const message =
            body?.error ??
            body?.message ??
            "Credenziali non valide"

        throw new Error(message)
    }

    return body
}