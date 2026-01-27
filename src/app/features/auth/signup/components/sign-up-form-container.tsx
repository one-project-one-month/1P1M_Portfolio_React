import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useState } from 'react';
import { checkEmailExists } from '../../register/services/api';
import { useOAuthHandler } from '../hooks/use-oauth-handler';
import SignUpForm from './sign-up-form';

const SignUpFormContainer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const { goTo } = useAppNavigation();

  const { isProcessing: isOAuthProcessing } = useOAuthHandler();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleContinue = async () => {
    if (!email) return;
    try {
      setIsLoading(true);
      const res = await checkEmailExists(email);
      if (res.success) {
        goTo('/auth/log-in');
      } else {
        goTo('/auth/register');
      }
    } catch (error) {
      addToast('Something went wrong', 'error', 1000);
    } finally {
      setIsLoading(false);
    }
  };

  if (isOAuthProcessing) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Verifying social login...</p>
      </div>
    );
  }

  return (
    <SignUpForm
      isLoading={isLoading}
      email={email}
      onChange={handleEmailChange}
      onContinue={handleContinue}
    />
  );
};

export default SignUpFormContainer;
