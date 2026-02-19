import Background from '@/components/background';
import FormBackground from '@/components/ui/form-bg';
import ForgotPasswordForm from './components/forgot-password-form';
import { useForgotPassword } from './hooks/use-forgot-password';

export default function ForgotPasswordPage() {
  const { email, setEmail, emailError, loading, handleContinue } =
    useForgotPassword();

  return (
    <Background>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <FormBackground className="w-full md:max-w-md flex flex-col items-center justify-around">
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            loading={loading}
            onContinue={handleContinue}
          />
        </FormBackground>
      </div>
    </Background>
  );
}
