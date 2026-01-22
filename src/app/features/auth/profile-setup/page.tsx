import Background from '@/components/background';
import { Button } from '@/components/ui/button';
import ProfileSetupForm from './components/profile-setup-form';

export default function ProfileSetupPage() {
  return (
    <Background className="h-screen flex items-center justify-center  ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="hidden lg:block font-sans text-sm font-semibold leading-8 p-8">
          <div className="h-full flex flex-col justify-center items-center lg:border-r-2 border-[#FFFFFF17] px-60">
            <div className="w-72 text-center mb-12">
              <h1 className="text-5xl font-bold text-white leading-[1.5]">
                Join With Us
              </h1>
              <p className="text-gray-200 leading-5 text-center ">
                Complete these steps to complete your profile
              </p>
            </div>
            <div className="space-y-4">
              <Button
                variant="black_button"
                size="white_button"
                className="flex items-center justify-start gap-3"
              >
                <div className="w-5 h-5 flex justify-center items-center border rounded-full">
                  <span className="text-xs">1</span>
                </div>
                Register Your Account
              </Button>
              <Button
                variant="white_button"
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
        <div className="flex  mx-auto h-screen gap-6 md:gap-1.5  justify-center items-center ">
          <ProfileSetupForm />
        </div>
      </div>
    </Background>
  );
}
