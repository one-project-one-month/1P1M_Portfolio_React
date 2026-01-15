import Background from '@/components/background';
import FormBackground from '@/components/ui/form-bg';
import ForgotPasswordForm from './components/forgot-password-form';
import { useForgotPassword } from './hooks/use-forgot-password';

export default function ForgotPasswordPage() {
  const { email, setEmail, emailError, loading, handleContinue } =
    useForgotPassword();

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center justify-around flex-col">
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          loading={loading}
          onContinue={handleContinue}
        />
      </FormBackground>
    </Background>
  );
}
