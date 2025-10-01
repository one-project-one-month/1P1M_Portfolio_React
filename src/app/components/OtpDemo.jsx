import React, { useState } from 'react';
import OtpPage from '../features/auth/pages/OtpPage';
import Background from '../components/ui/Background';
import Button from '../components/ui/Button';

function OtpDemo() {
  const [showOtp, setShowOtp] = useState(false);
  const [email] = useState('nora@gmail.com');

  const handleShowOtp = () => {
    setShowOtp(true);
  };

  const handleVerifySuccess = () => {
    alert('OTP Verified Successfully');
    setShowOtp(false);
  };

  const handleBackToSignup = () => {
    alert('Redirecting back to signup');
    setShowOtp(false);
  };

  const handleResendOtp = async () => {
    console.log('Resending OTP to:', email);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        alert('OTP resent successfully');
        resolve();
      }, 500);
    });
  };

  if (showOtp) {
    return (
      <OtpPage
        email={email}
        onVerifySuccess={handleVerifySuccess}
        onBackToSignup={handleBackToSignup}
        onResendOtp={handleResendOtp}
      />
    );
  }

  return (
    <Background className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold mb-6">
          OTP Verification Demo
        </h1>
        <h2 className="text-sm text-white mb-6">
            Demo: Use "123456" as the valid OTP code
        </h2>

        <Button
          variant="primary"
          size="primary"
          onClick={handleShowOtp}
        >
          Demo OTP
        </Button>
      </div>
    </Background>
  );
}

export default OtpDemo;


