import { decryptData, encryptData } from '@/lib/crypto';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface Auth {
  userId: number | null | undefined;
  username: string | null | undefined;
  role: 'ADMIN' | 'USER' | null | undefined;
}

interface AuthContextType {
  auth: Auth;
  saveAuth: (auth: Auth) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const secretKey = 'my-super-password-key';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<Auth>({
    userId: null,
    username: null,
    role: null,
  });

  useEffect(() => {
    async function loadUserData() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const decrypted = await decryptData(savedUser, secretKey);
          const parsed = JSON.parse(decrypted);
          setAuth(parsed);
        } catch (e) {
          console.error('Failed to decrypt auth data', e);
          localStorage.removeItem('user');
        }
      }

      setIsLoading(false);
    }
    loadUserData();
  }, []);

  const saveAuth = async (newAuth: Auth) => {
    try {
      const data = JSON.stringify(newAuth);
      const encrypted = await encryptData(data, secretKey);
      localStorage.setItem('user', encrypted);
      setAuth(newAuth);
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth({ userId: null, username: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
