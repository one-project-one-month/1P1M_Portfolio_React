import Background from '../../../components/ui/Background';
import FormBackground from '../../../components/ui/FormBackground';
import OtpForm from '../components/OtpForm';

function OtpPage({ 
  email, 
  onVerifySuccess, 
  onBackToSignup, 
  onResendOtp 
}) {
  return (
    <Background className="min-h-screen flex items-center justify-center p-4">
      <FormBackground className="flex items-center justify-center" width='600px' height='400px'>
        <OtpForm
          email={email}
          onVerifySuccess={onVerifySuccess}
          onBackToSignup={onBackToSignup}
          onResendOtp={onResendOtp}
        />
      </FormBackground>
    </Background>
  );
}

export default OtpPage;