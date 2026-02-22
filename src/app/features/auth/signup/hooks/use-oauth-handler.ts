import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useUserInfoStore, type UserInfo } from '@/store/user-info-store';
import type { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { exchangeGitHub, exchangeGoogleCode } from '../services/api';

export const useOAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const { goTo, handleRoute } = useAppNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { setUserInfo } = useUserInfoStore();

  const processedRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state && !processedRef.current) {
      processedRef.current = true;
      handleOAuthExchange(code, state);
    }
  }, [searchParams]);

  const handleOAuthExchange = async (code: string, provider: string) => {
    setIsProcessing(true);
    try {
      let response;

      if (provider === 'google') {
        response = await exchangeGoogleCode(code);
      } else if (provider === 'github') {
        response = await exchangeGitHub(code);
      }

      console.log('Oauth', response);

      if (response?.success) {
        const user: UserInfo = {
          role: response.data?.user.role.name,
          email: response.data?.user.email,
          userId: response.data?.user.email,
          username: response.data?.user.username,
          profile: response.data?.profile_picture,
        };

        handleRoute(response?.data?.user.role.name, response?.data?.isNewUser);

        setUserInfo(user);
        addToast(`Welcome back! Logged in with ${provider}`, 'success', 2000);

        handleRoute(user?.role ?? 'USER', response.data?.newUser);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      const err = error as AxiosError;

      addToast((err?.response?.data as any)?.message, 'error', 6000);

      if (err.response) {
        return {
          success: false,
          code: err.response.status,
          message: (err.response?.data as any)?.message || 'Error',
        };
      }

      addToast(err?.message, 'error', 6000);

      goTo('/auth/sign-up');
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing };
};
