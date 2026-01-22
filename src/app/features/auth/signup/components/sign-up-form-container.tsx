import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useState } from 'react';
import { checkEmailExists } from '../../register/services/api';
import SignUpForm from './sign-up-form';

const SignUpFormContainer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const { goTo } = useAppNavigation();

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
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
