import { useCallback, useEffect, useState } from 'react';
import { sendOtpCode, verifyOtpCode } from '../../register/services/api';

interface OtpData {
  value: string;
  attempts: number;
  hasError: boolean;
  errorMessage: string;
  isResendDisabled: boolean;
  resendTimer: number;
  status: 'idle' | 'verifying' | 'resending';
}

const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN = 60;

export function useOtpVerification(email: string) {
  const [otpData, setOtpData] = useState<OtpData>({
    value: '',
    attempts: 0,
    hasError: false,
    errorMessage: '',
    isResendDisabled: false,
    resendTimer: 0,
    status: 'idle',
  });

  // --- Timer Logic ---
  useEffect(() => {
    if (otpData.resendTimer <= 0) return;

    const timerId = setInterval(() => {
      setOtpData((prev) => {
        if (prev.resendTimer <= 1) {
          return { ...prev, resendTimer: 0, isResendDisabled: false };
        }
        return { ...prev, resendTimer: prev.resendTimer - 1 };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [otpData.resendTimer]);

  // --- Actions ---
  const updateOtpValue = useCallback((value: string) => {
    setOtpData((prev) => ({
      ...prev,
      value,
      hasError: false,
      errorMessage: '',
    }));
  }, []);

  const setError = useCallback((message: string) => {
    setOtpData((prev) => ({ ...prev, hasError: true, errorMessage: message }));
  }, []);

  const startResendTimer = useCallback(() => {
    setOtpData((prev) => ({
      ...prev,
      isResendDisabled: true,
      resendTimer: RESEND_COOLDOWN,
    }));
  }, []);

  const verifyOtp = useCallback(
    async (otp: string) => {
      setOtpData((prev) => ({ ...prev, status: 'verifying' }));
      try {
        const response = await verifyOtpCode(email, otp);
        const success = response.success || response.code === 200;

        if (!success) {
          setOtpData((prev) => ({
            ...prev,
            attempts: prev.attempts + 1,
            value: '',
          }));
        }
        return success;
      } catch (error) {
        setError('Verification failed. Please try again.');
        return false;
      } finally {
        setOtpData((prev) => ({ ...prev, status: 'idle' }));
      }
    },
    [email, setError],
  );

  const resendOtp = useCallback(async () => {
    setOtpData((prev) => ({ ...prev, status: 'resending' }));
    try {
      const response = await sendOtpCode(email);
      startResendTimer();
      return response.success || response.code === 200;
    } catch (error) {
      setError('Failed to resend code.');
      throw error;
    } finally {
      setOtpData((prev) => ({ ...prev, status: 'idle' }));
    }
  }, [email, startResendTimer, setError]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return {
    otpData,
    isVerifying: otpData.status === 'verifying',
    isResending: otpData.status === 'resending',
    MAX_ATTEMPTS,
    updateOtpValue,
    setError,
    verifyOtp,
    resendOtp,
    formatTimer: () => formatTimer(otpData.resendTimer),
  };
}
