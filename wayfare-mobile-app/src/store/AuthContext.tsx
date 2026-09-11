import { createContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

type Account = {
  email: string;
  password: string;
};

type LoginResult = 'invalidCredentials' | 'noAccount' | 'success';

type AuthContextValue = {
  createAccount: (account: Account) => void;
  login: (account: Account) => LoginResult;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [account, setAccount] = useState<Account | undefined>(undefined);

  const value = useMemo<AuthContextValue>(
    () => ({
      createAccount: (newAccount) => setAccount(newAccount),
      login: (credentials) => {
        if (account === undefined) {
          return 'noAccount';
        }

        if (account.email !== credentials.email || account.password !== credentials.password) {
          return 'invalidCredentials';
        }

        return 'success';
      },
    }),
    [account],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
