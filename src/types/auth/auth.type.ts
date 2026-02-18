import type { AcctType } from "../account/account.type";

export type AuthStoreType = {
    loading: boolean;
    setRegister: (data: Partial<AcctType>) => Promise<boolean>;
    setLogin: (data: Partial<AcctType>) => Promise<boolean>;
    logout: () => Promise<boolean>;
    initializeAuth: () => Promise<void>;
};
