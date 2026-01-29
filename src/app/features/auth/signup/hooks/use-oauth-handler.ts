import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { exchangeGitHub, exchangeGoogleCode } from '../services/api';

export const useOAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const { goTo } = useAppNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

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

      if (response?.success) {
        addToast(`Welcome back! Logged in with ${provider}`, 'success', 2000);

        goTo('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      addToast('Social login failed. Please try again.', 'error', 2000);

      goTo('/auth/sign-up');
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing };
};
