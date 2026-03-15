import { type ReactNode, useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { apiClient } from "@/lib/api/config"

type ProtectedRouteProps = {
    children: ReactNode
    authCheckPath: string
    redirectTo?: string
}

export const ProtectedRoute = ({ children, authCheckPath, redirectTo = "/login" }: ProtectedRouteProps) => {
    const location = useLocation()
    const [isChecking, setIsChecking] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        let isMounted = true
        setIsChecking(true)

        const checkSession = async () => {
            try {
                await apiClient.get(authCheckPath)

                if (!isMounted) return
                setIsAuthorized(true)
            } catch {
                if (!isMounted) return
                setIsAuthorized(false)
            } finally {
                if (isMounted) setIsChecking(false)
            }
        }

        void checkSession()

        return () => {
            isMounted = false
        }
    }, [authCheckPath, location.pathname])

    if (isChecking) {
        return (
            <div className="h-screen w-full flex items-center justify-center text-md text-muted-foreground">
                Verifica sessione in corso...
            </div>
        )
    }

    if (!isAuthorized) {
        return <Navigate to={redirectTo} replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
