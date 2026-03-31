interface Window {
    google: {
        accounts: {
            id: {
                initialize: (
                    config: {
                        client_id: string;
                        callback: (response: any) => void;
                        auto_select?: boolean
                    }) => void;
                renderButton: (
                    element: HTMLElement | null,
                    options: {
                        theme: string;
                        size: string;
                        type?: string;
                        locale?: string;
                        text?: string
                        logo_alignment?: string
                        shape?: "rectangular" | "pill" | "circle" | "square";
                    }) => void;
            };
        };
    };
}