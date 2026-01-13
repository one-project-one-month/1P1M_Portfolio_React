import Background from '@/components/background';
import FormBackground from '@/components/ui/form-bg';
import ResetPasswordForm from './components/reset-password-form';
import { useResetPassword } from './hooks/use-reset-password';

export default function ResetPasswordPage() {
  const {
    passwordRef,
    cfmpasswordRef,
    passwordError,
    cmfPasswordError,
    loading,
    passwordRestted,
    handlePasswordReset,
    handleContinue,
  } = useResetPassword();

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="h-auto shadow shadow-[#fff]/20">
        <ResetPasswordForm
          passwordRef={passwordRef}
          cfmpasswordRef={cfmpasswordRef}
          passwordError={passwordError}
          cmfPasswordError={cmfPasswordError}
          loading={loading}
          passwordRestted={passwordRestted}
          onPasswordReset={handlePasswordReset}
          onContinue={handleContinue}
        />
      </FormBackground>
    </Background>
  );
}
