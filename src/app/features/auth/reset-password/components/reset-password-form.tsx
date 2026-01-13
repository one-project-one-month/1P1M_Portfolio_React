import FormWrapper from '@/components/ui/form-wrapper';
import PasswordField from '@/components/ui/password-field';

interface ResetPasswordFormProps {
  passwordRef: React.RefObject<HTMLInputElement>;
  cfmpasswordRef: React.RefObject<HTMLInputElement>;
  passwordError: string;
  cmfPasswordError: string;
  loading: boolean;
  passwordRestted: boolean;
  onPasswordReset: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onContinue: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ResetPasswordForm({
  passwordRef,
  cfmpasswordRef,
  passwordError,
  cmfPasswordError,
  loading,
  passwordRestted,
  onPasswordReset,
  onContinue,
}: ResetPasswordFormProps) {
  return (
    <>
      {!passwordRestted ? (
        <FormWrapper
          title="Reset password"
          onSubmit={onPasswordReset}
          loading={loading}
          buttonText="Update password"
        >
          <PasswordField
            ref={passwordRef}
            name="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            error={passwordError}
          />
          <PasswordField
            ref={cfmpasswordRef}
            name="cfmpassword"
            id="cfmpassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            error={cmfPasswordError}
          />
        </FormWrapper>
      ) : (
        <FormWrapper
          title="Successful"
          subtitle="Congratulations! Your password has been changer. Click continue to login."
          onSubmit={onContinue}
          loading={loading}
          buttonText="Continue"
        >
          <div className="my-8"></div>
        </FormWrapper>
      )}
    </>
  );
}
