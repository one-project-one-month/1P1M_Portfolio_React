import { decryptData, encryptData } from '@/lib/crypto';
import { useEffect, useState } from 'react';

export interface Auth {
  userId: number | null | undefined;
  role: 'ADMIN' | 'USER' | null | undefined;
}
const secretKey = 'my-super-password-key';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<Auth>({ userId: null, role: null });

  useEffect(() => {
    async function LoadUserData() {
      const savedUser = localStorage.getItem('_u_data');
      if (savedUser) {
        try {
          const decrypted = await decryptData(savedUser, secretKey);
          setAuth(JSON.parse(decrypted));
        } catch (e) {
          localStorage.removeItem('_u_data');
        } finally {
          setIsLoading(false);
        }
      }
    }
    LoadUserData();
  }, []);

  const saveAuth = async (auth: Auth) => {
    const data = JSON.stringify(auth);
    const encrypted = await encryptData(data, secretKey);
    localStorage.setItem('_u_data', encrypted);
    setAuth(auth);
  };

  const logout = () => {
    localStorage.removeItem('_u_data');
    setAuth({ userId: null, role: null });
  };
  return { ...auth, saveAuth, logout, isLoading };
};
