import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { apiClient } from "@/lib/api/config";
import { setLogoutHandler } from "@/lib/api/interceptors";
import type { Account } from "@/types/types";

type AccountContextType = {
    account: Account | null;
    loading: boolean;
    updateAccount: (account: Account | null) => void;
    logout: () => Promise<void>;
    refreshAccount: () => Promise<void>;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const STORAGE_KEY = "account";

type Props = {
    children: ReactNode;
};

export const AccountProvider = ({ children }: Props) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    const updateAccount = useCallback((acc: Account | null) => {
        setAccount(acc);

        if (acc) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const refreshAccount = useCallback(async () => {
        try {
            const res = await apiClient.get<Account>("/auth/account");
            updateAccount(res.data);
        } catch {
            updateAccount(null);
        }
    }, [updateAccount]);

    const logout = useCallback(async () => {
        try {
            await apiClient.post("/auth/account/logout");
        } catch {
            console.log("Logout failed, but clearing account data anyway.");
        }

        updateAccount(null);
    }, [updateAccount]);

    useEffect(() => {
        setLogoutHandler(() => {
            updateAccount(null);
        });
    }, [updateAccount]);

    useEffect(() => {
        const init = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);

                if (stored) {
                    setAccount(JSON.parse(stored));
                }

                await refreshAccount();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [refreshAccount]);

    const contextValue = useMemo(() => ({
        account,
        loading,
        updateAccount,
        logout,
        refreshAccount,
    }), [account, loading, updateAccount, logout, refreshAccount]);

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error("useAccount must be used inside AccountProvider");
    }

    return context;
};