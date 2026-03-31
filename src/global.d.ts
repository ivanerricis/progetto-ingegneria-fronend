interface Window {
    google: {
        accounts: {
            id: {
                initialize: (config: { client_id: string; callback: (response: any) => void }) => void;
                renderButton: (element: HTMLElement | null, options: { theme: string; size: string; type?: string }) => void;
            };
        };
    };
}