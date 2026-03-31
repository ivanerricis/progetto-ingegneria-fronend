import { useCallback, useEffect, useRef } from "react";

type GoogleCredentialResponse = {
    credential: string;
    select_by?: string;
};

export default function ButtonGoogle() {
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleCredentialResponse = useCallback(async (response: GoogleCredentialResponse) => {
        const idToken = response.credential;

        await fetch("/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id_token: idToken
            })
        });
    }, []);

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.ID_CLIENT_GOOGLE,
            callback: handleCredentialResponse
        });

        if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
                theme: "outline",
                size: "large",
                type: "standard",
            });
        }
    }, [handleCredentialResponse]);

    return <div ref={buttonRef}></div>;
}