type GoogleCredentialResponse = {
    credential: string;
    select_by?: string;
};

type GoogleButtonTheme = "outline" | "filled_blue" | "filled_black";
type GoogleButtonSize = "large" | "medium" | "small";
type GoogleButtonType = "standard" | "icon";
type GoogleButtonText = "signin_with" | "signup_with" | "continue_with" | "signin";
type GoogleLogoAlignment = "left" | "center";
type GoogleButtonShape = "rectangular" | "pill" | "circle" | "square";

type GoogleInitializeConfig = {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
};

type GoogleRenderButtonOptions = {
    theme: GoogleButtonTheme;
    size: GoogleButtonSize;
    type?: GoogleButtonType;
    locale?: string;
    text?: GoogleButtonText;
    logo_alignment?: GoogleLogoAlignment;
    shape?: GoogleButtonShape;
    width?: number;
};

interface Window {
    google: {
        accounts: {
            id: {
                initialize: (config: GoogleInitializeConfig) => void;
                renderButton: (
                    element: HTMLElement | null,
                    options: GoogleRenderButtonOptions) => void;
            };
        };
    };
}