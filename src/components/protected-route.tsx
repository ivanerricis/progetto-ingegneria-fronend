import { type ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isChecking, setIsChecking] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ""
    const authCheckPath = import.meta.env.VITE_AUTH_CHECK_PATH ?? "/auth/me"

    useEffect(() => {
        let isMounted = true

        const checkSession = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}${authCheckPath}`, {
                    method: "GET",
                    credentials: "include",
                })

                if (!isMounted) {
                    return
                }

                setIsAuthorized(response.ok)
            } catch {
                if (!isMounted) {
                    return
                }

                setIsAuthorized(false)
            } finally {
                if (isMounted) {
                    setIsChecking(false)
                }
            }
        }

        void checkSession()

        return () => {
            isMounted = false
        }
    }, [apiBaseUrl, authCheckPath])

    if (isChecking) {
        return (
            <div className="h-screen w-full flex items-center justify-center text-sm text-muted-foreground">
                Verifica sessione in corso...
            </div>
        )
    }

    if (!isAuthorized) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
