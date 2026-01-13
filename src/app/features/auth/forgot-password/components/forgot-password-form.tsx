import { Button } from '@/components/ui/button';
import TextField from '@/components/ui/text-field';

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  loading: boolean;
  onContinue: () => void;
}

export default function ForgotPasswordForm({
  email,
  setEmail,
  emailError,
  loading,
  onContinue,
}: ForgotPasswordFormProps) {
  return (
    <>
      <div className="text-white">
        <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
          Forgot Password
        </h1>
        <p className="font-sans text-sm text-[#99A1AF] w-full text-center">
          Enter your email and we will send <br />
          code to reset password.
        </p>
      </div>

      <div className="w-[404px] h-[140px] px-6 flex items-center justify-between flex-col">
        <div className="w-full relative">
          <TextField
            label="Email"
            id="email"
            name="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(value) => setEmail(value)}
            error={emailError}
            className="relative w-full text-white font-sans text-sm font-semibold leading-8"
          />
        </div>

        <Button
          onClick={onContinue}
          variant="primary"
          size="primary"
          className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-1"
        >
          {loading ? 'Processing...' : 'Continue'}
        </Button>
      </div>
      <div className="mt-6 py-4 flex text-sm text-[#99A1AF]">
        <a
          href="/auth/log-in"
          className="flex text-center cursor-pointer block"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </a>
      </div>
    </>
  );
}
