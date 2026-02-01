import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useState } from 'react';
import z from 'zod';
import { checkEmailExists } from '../../register/services/api';
import { useOAuthHandler } from '../hooks/use-oauth-handler';
import SignUpForm from './sign-up-form';

const SignUpFormContainer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const { goTo } = useAppNavigation();

  const { isProcessing: isOAuthProcessing } = useOAuthHandler();

  const emailSchema = z.email('Please enter a valid email address');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleContinue = async () => {
    const validation = emailSchema.safeParse(email);

    if (!validation.success) {
      addToast('Please enter a valid email address', 'error', 3000);
      return;
    }

    try {
      setIsLoading(true);
      const res = await checkEmailExists(email);

      if (res.success) {
        goTo('/auth/log-in', { state: { email } });
      } else {
        goTo('/auth/register', { state: { email } });
      }
    } catch (error) {
      addToast('Connection failed. Please try again.', 'error', 3000);
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
