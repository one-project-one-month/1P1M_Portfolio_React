import { useState, useEffect, useCallback } from 'react';

export const useOtpVerification = (email) => {
  const [otpData, setOtpData] = useState({
    value: '',
    attempts: 0,
    hasError: false,
    errorMessage: '',
    isResendDisabled: false,
    resendTimer: 0,
    isVerifying: false,
    isResending: false,
  });

  const MAX_ATTEMPTS = 5;
  const RESEND_COOLDOWN = 60;

  const startResendTimer = useCallback(() => {
    setOtpData(prev => ({
      ...prev,
      isResendDisabled: true,
      resendTimer: RESEND_COOLDOWN
    }));
  }, []);

  useEffect(() => {
    let timer;
    if (otpData.resendTimer > 0) {
      timer = setTimeout(() => {
        setOtpData(prev => ({
          ...prev,
          resendTimer: prev.resendTimer - 1
        }));
      }, 1000);
    } else if (otpData.resendTimer === 0 && otpData.isResendDisabled) {
      setOtpData(prev => ({
        ...prev,
        isResendDisabled: false
      }));
    }
    return () => clearTimeout(timer);
  }, [otpData.resendTimer, otpData.isResendDisabled]);

  const updateOtpValue = useCallback((value) => {
    setOtpData(prev => ({
      ...prev,
      value,
      hasError: false,
      errorMessage: ''
    }));
  }, []);

  const setError = useCallback((message) => {
    setOtpData(prev => ({
      ...prev,
      hasError: true,
      errorMessage: message
    }));
  }, []);

  const incrementAttempts = useCallback(() => {
    setOtpData(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      value: ''
    }));
  }, []);

  const resetAttempts = useCallback(() => {
    setOtpData(prev => ({
      ...prev,
      attempts: 0,
      value: '',
      hasError: false,
      errorMessage: ''
    }));
  }, []);

  const setVerifying = useCallback((isVerifying) => {
    setOtpData(prev => ({
      ...prev,
      isVerifying
    }));
  }, []);

  const setResending = useCallback((isResending) => {
    setOtpData(prev => ({
      ...prev,
      isResending
    }));
  }, []);

  // API calls - replace these with actual API endpoints
  const verifyOtp = useCallback(async (otp) => {
    setVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isValid = otp === '123456';
      return isValid;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    } finally {
      setVerifying(false);
    }
  }, [email]);

  const resendOtp = useCallback(async () => {
    setResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('OTP resend error:', error);
      throw error;
    } finally {
      setResending(false);
    }
  }, [email]);

  const formatTimer = useCallback((seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  }, []);

  return {
    otpData,
    MAX_ATTEMPTS,
    updateOtpValue,
    setError,
    incrementAttempts,
    resetAttempts,
    startResendTimer,
    verifyOtp,
    resendOtp,
    formatTimer,
  };
};