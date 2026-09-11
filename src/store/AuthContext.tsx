import { createContext, useEffect, useMemo, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ReactNode } from 'react';

type Account = {
  email: string;
  password: string;
};

type LoginResult = 'invalidCredentials' | 'noAccount' | 'success';
type StorageLoginResult = LoginResult | 'storageError';

type AuthContextValue = {
  createAccount: (account: Account) => Promise<boolean>;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (account: Account) => Promise<StorageLoginResult>;
};

const accountStorageKey = 'wayfare.demo-account';
const authenticationStorageKey = 'wayfare.is-authenticated';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      try {
        const storedAccount = await AsyncStorage.getItem(accountStorageKey);

        if (storedAccount) {
          const parsedAccount: unknown = JSON.parse(storedAccount);

          if (
            typeof parsedAccount === 'object' &&
            parsedAccount !== null &&
            'email' in parsedAccount &&
            'password' in parsedAccount &&
            typeof parsedAccount.email === 'string' &&
            typeof parsedAccount.password === 'string'
          ) {
            setAccount({ email: parsedAccount.email, password: parsedAccount.password });
            const isStoredSession = await AsyncStorage.getItem(authenticationStorageKey);
            setIsAuthenticated(isStoredSession === 'true');
          }
        }
      } catch {
        await AsyncStorage.multiRemove([accountStorageKey, authenticationStorageKey]);
      } finally {
        setIsReady(true);
      }
    }

    void loadAccount();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      createAccount: async (newAccount) => {
        try {
          await AsyncStorage.multiSet([
            [accountStorageKey, JSON.stringify(newAccount)],
            [authenticationStorageKey, 'false'],
          ]);
          setAccount(newAccount);
          setIsAuthenticated(false);
          return true;
        } catch {
          return false;
        }
      },
      isAuthenticated,
      isReady,
      login: async (credentials) => {
        if (account === undefined) {
          return 'noAccount';
        }

        if (account.email !== credentials.email || account.password !== credentials.password) {
          return 'invalidCredentials';
        }

        try {
          await AsyncStorage.setItem(authenticationStorageKey, 'true');
          setIsAuthenticated(true);
          return 'success';
        } catch {
          return 'storageError';
        }
      },
    }),
    [account, isAuthenticated, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
