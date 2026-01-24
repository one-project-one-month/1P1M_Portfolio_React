import OtpInput from '@/components/ui/otp-input';
import toast from 'react-hot-toast';
import Button from '../../login/components/button';
import { useOtpVerification } from '../hooks/use-otp-verification';

interface OtpFormProps {
  email: string;

  onVerifySuccess?: () => void;

  onMaxAttemptsExceeded?: () => void;

  onBackToSignup?: () => void;
}

export default function OtpForm({
  email,
  onVerifySuccess,
  onMaxAttemptsExceeded,
}: OtpFormProps) {
  if (!email) throw new Error('Email is required');

  const {
    otpData,
    MAX_ATTEMPTS,
    updateOtpValue,
    verifyOtp,
    resendOtp,
    formatTimer,
  } = useOtpVerification(email);

  const {
    value: otpValue,
    hasError,
    errorMessage,
    isResendDisabled,
    status,
  } = otpData;
  const isVerifying = status === 'verifying';

  // 3. Handlers
  const handleVerify = async () => {
    if (otpValue.length !== 6)
      return toast.error('Please enter a 6-digit code.');

    toast.loading('Verifying code...', { id: 'otp' });
    const success = await verifyOtp(otpValue);

    if (success) {
      toast.success('Verified!', { id: 'otp' });
      onVerifySuccess?.();
    } else {
      toast.error('Invalid code.', { id: 'otp' });
      // If hook reached max attempts, call callback
      if (otpData.attempts + 1 >= MAX_ATTEMPTS) {
        onMaxAttemptsExceeded?.();
      }
    }
  };

  const handleResend = async () => {
    try {
      toast.loading('Resending...', { id: 'otp' });
      const success = await resendOtp();
      if (success) toast.success('New code sent!', { id: 'otp' });
    } catch (error) {
      toast.error('Failed to resend.', { id: 'otp' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-400 text-lg">
          Sent to <span className="text-white">{email}</span>
        </p>
      </div>

      <OtpInput
        value={otpValue}
        onChange={updateOtpValue}
        onComplete={handleVerify}
        hasError={hasError}
        disabled={isVerifying}
      />

      <div className="text-center flex items-center gap-2">
        <p className={`text-md ${hasError ? 'text-red-400' : 'text-gray-400'}`}>
          {hasError ? errorMessage : "Didn't receive code?"}
        </p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className="text-sm font-medium text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-purple-300 transition-colors"
        >
          {isResendDisabled ? `Resend in ${formatTimer()}` : 'Resend Code'}
        </button>
      </div>

      <Button
        variant="primary"
        size="primary"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || isVerifying}
        className="w-full"
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
      </Button>
    </div>
  );
}
