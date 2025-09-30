import Button from '../../../components/ui/Button';
import OtpInput from '../../../components/ui/OtpInput';
import { useOtpVerification } from '../hooks';

function OtpForm({ 
  email = "nora@gmail.com", 
  onVerifySuccess, 
  onBackToSignup 
}) {
  const {
    otpData,
    MAX_ATTEMPTS,
    updateOtpValue,
    setError,
    incrementAttempts,
    startResendTimer,
    verifyOtp,
    resendOtp,
    formatTimer,
  } = useOtpVerification(email);

  const {
    value: otpValue,
    attempts,
    hasError,
    errorMessage,
    isResendDisabled,
    resendTimer,
    isVerifying,
  } = otpData;

  const handleOtpChange = (value) => {
    updateOtpValue(value);
  };

  const handleVerify = async () => {
    console.log('Verifying OTP:', otpValue);
    if (otpValue.length !== 6) {
      return;
    }

    try {
      const isValid = await verifyOtp(otpValue);
      
      if (isValid) {
        onVerifySuccess?.();
      } else {
        setError('Please enter the valid code.');
        incrementAttempts();
        
        const newAttempts = attempts + 1;
        if (newAttempts >= MAX_ATTEMPTS) {
          setTimeout(() => {
            onBackToSignup?.();
          }, 1000);
        }
      }
    } catch (error) {
      setError('Please enter the valid code.');
      incrementAttempts();
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;
    
    try {
      await resendOtp();
      startResendTimer();
      updateOtpValue('');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };



  if (attempts >= MAX_ATTEMPTS) {
    return (
      <div className="flex flex-col items-center gap-6">
        Route back to sign up page
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-white text-3xl font-semibold mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-400 text-lg">
          We send a code to {email}
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex flex-col items-center gap-4">
        <OtpInput
          value={otpValue}
          onChange={handleOtpChange}
          onComplete={handleVerify}
          hasError={hasError}
          disabled={isVerifying}
        />
      </div>

      {/* Resend Code */}
      <div className="text-center flex items-center gap-2">
        <p className={`text-md ${
          hasError && errorMessage 
            ? 'text-red-400' 
            : 'text-gray-400'
        }`}>
          {hasError && errorMessage ? errorMessage : "Didn't receive OTP code?"}
        </p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`text-sm cursor-pointer ${
            isResendDisabled
              ? 'text-purple-400 opacity-50 cursor-not-allowed' 
              : 'text-purple-400 hover:text-purple-300'
          }`}
        >
          {isResendDisabled 
            ? `Resend Code (${formatTimer(resendTimer)})` 
            : 'Resend Code'
          }
        </button>
      </div>

      {/* Verify Button */}
      <Button
        variant="primary"
        size="primary"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || isVerifying}
        className={`cursor-pointer${
          otpValue.length !== 6 || isVerifying
            ? 'opacity-50 cursor-not-allowed' 
            : ''
        }`}
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
      </Button>
    </div>
  );
}

export default OtpForm;