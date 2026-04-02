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
    SetAccount: (account: Account | null) => void
    logout: () => Promise<void>;
    refreshAccount: () => Promise<void>;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const STORAGE_KEY = "account";

type Props = {
    children: ReactNode;
};

const isAccount = (value: unknown): value is Account => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Partial<Account>;
    return typeof candidate.id === "number"
        && typeof candidate.firstName === "string"
        && typeof candidate.lastName === "string"
        && typeof candidate.email === "string";
};

const extractAccountFromPayload = (payload: unknown): Account | null => {
    if (isAccount(payload)) return payload;

    if (payload && typeof payload === "object" && "account" in payload) {
        const nestedAccount = (payload as { account?: unknown }).account;
        if (isAccount(nestedAccount)) return nestedAccount;
    }

    return null;
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

    const SetAccount = useCallback((acc: Account | null) => {
        updateAccount(acc);
    }, [updateAccount]);

    const refreshAccount = useCallback(async () => {
        try {
            const res = await apiClient.get<Account | { account: Account }>("/auth/account");
            const resolvedAccount = extractAccountFromPayload(res.data);
            updateAccount(resolvedAccount);
        } catch {
            updateAccount(null);
        }
    }, [updateAccount]);

    const logout = useCallback(async () => {
        try {
            await apiClient.post("/auth/account/logout");
        } catch {
            console.warn("Logout failed, but clearing account data anyway.");
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
                    try {
                        const parsedStored = JSON.parse(stored);
                        const storedAccount = extractAccountFromPayload(parsedStored);
                        if (storedAccount) {
                            setAccount(storedAccount);
                        } else {
                            localStorage.removeItem(STORAGE_KEY);
                        }
                    } catch {
                        localStorage.removeItem(STORAGE_KEY);
                    }
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
        SetAccount
    }), [account, loading, updateAccount, logout, refreshAccount, SetAccount]);

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