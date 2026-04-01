import { apiClient } from "@/lib/api/config";
import { cn } from "@/lib/utils";
import { useAccount } from "@/providers/account-provider";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type GoogleCredentialResponse = {
    credential: string;
    select_by?: string;
};

type ButtonGoogleProps = {
    maxWidthClass?: string;
};

export default function ButtonGoogle({ maxWidthClass = "max-w-97.5" }: ButtonGoogleProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    const { updateAccount } = useAccount()

    const handleCredentialResponse = useCallback(async (response: GoogleCredentialResponse) => {
        const idToken = response.credential;

        try {
            const response = await apiClient.post("/auth/account/google", { idToken: idToken }, { withCredentials: true });
            console.log("Login con Google riuscito", response.data);
            const account = response.data?.account ?? response.data;
            updateAccount(account);
            navigate("/homepage");
        } catch (error) {
            if (isAxiosError(error)) {
                const message = error.response?.data?.error || error.response?.data?.message || "Login con Google non riuscito";
                toast.error(message);
            } else {
                toast.error("Si è verificato un errore sconosciuto durante il login con Google");
            }
        }
    }, [updateAccount, navigate]);

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_ID_CLIENT_GOOGLE,
            callback: handleCredentialResponse,
            auto_select: false,
        });

        if (buttonRef.current) {
            // Clear previous GIS content to avoid duplicated/stale button nodes.
            buttonRef.current.innerHTML = "";
            window.google.accounts.id.renderButton(buttonRef.current, {
                theme: "outline",
                size: "large",
                type: "standard",
                locale: "it",
                text: "continue_with",
                logo_alignment: "center",
            });
        }
    }, [handleCredentialResponse]);

    return (
        <div className="w-full flex justify-center">
            <div ref={buttonRef} className={cn("w-full", maxWidthClass)} />
        </div>
    );
}