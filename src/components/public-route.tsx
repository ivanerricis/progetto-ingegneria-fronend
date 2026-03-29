import { type ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { resolveSession } from "@/lib/api/resolveSession"
import Loading from "@/pages/Loading/Loading"

type PublicRouteProps = {
    children: ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const [redirectTo, setRedirectTo] = useState<string | null>(null)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        let isMounted = true
        resolveSession().then(result => {
            if (!isMounted) return
            setRedirectTo(result)
            setChecked(true)
        })
        return () => { isMounted = false }
    }, [])

    if (!checked) return <Loading />
    if (redirectTo) return <Navigate to={redirectTo} replace />
    return <>{children}</>
}

export default PublicRoute