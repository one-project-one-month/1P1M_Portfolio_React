import { Link } from 'react-router-dom';
import Background from '../../../../components/background';
import { Button } from '../../../../components/ui/button';
import FormBackground from '../../../../components/ui/form-bg';
import RegisterForm from './components/register-form';

function RegisterPage() {
  return (
    <Background className="h-screen flex items-center justify-center mx-auto">
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="font-sans text-sm font-semibold leading-8 p-8">
          <div className="h-full flex flex-col justify-center items-center lg:border-r-2 border-[#FFFFFF17] px-60">
            <div className="w-72 text-center mb-12">
              <h1 className="text-5xl font-bold text-white leading-normal">
                Join With Us
              </h1>
              <p className="text-gray-200 leading-5 text-center">
                Complete these steps to complete your profile
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="white_button"
                size="white_button"
                className="flex items-center justify-start gap-3"
              >
                <div className="w-5 h-5 flex justify-center items-center border rounded-full">
                  <span className="text-xs">1</span>
                </div>
                Register Your Account
              </Button>

              <Button
                variant="black_button"
                size="black_button"
                className="flex items-center justify-start gap-3"
              >
                <div className="w-5 h-5 flex justify-center items-center border rounded-full">
                  <span className="text-xs">2</span>
                </div>
                Set up your profile
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <FormBackground className="h-auto shadow shadow-white/20">
              <RegisterForm />

              <div className="flex justify-center gap-8 text-white/60 mt-6">
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
                <span className="text-white/20">|</span>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </FormBackground>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;
