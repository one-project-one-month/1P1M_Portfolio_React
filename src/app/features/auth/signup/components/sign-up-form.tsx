import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import TextField from '@/components/ui/text-field';
import { NavLink } from 'react-router-dom';
import AuthFormHeading from '../../auth-form-heading';
import GithubBtn from './github-btn';
import GoogleBtn from './google-btn';

type SignUpFormProps = {
  email: string;
  onContinue: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
};
const SignUpForm = ({
  email,
  onContinue,
  onChange,
  isLoading,
}: SignUpFormProps) => {
  return (
    <FormBackground className="w-full max-w-[532px] h-fit flex flex-col gap-6 mx-auto">
      <AuthFormHeading
        title="Welcome to OPOM"
        desc="Join thousands of others building the future together"
      />

      <div className="flex flex-col gap-5">
        <TextField
          onChange={onChange}
          value={email}
          type="email"
          className="font-light text-sm"
          placeholder="Enter your email"
          label="Email"
        />

        <Button
          onClick={onContinue}
          variant={'purple_button'}
          disabled={isLoading}
          className="w-full h-12"
        >
          {isLoading ? 'Checking Email...' : 'Continue'}
        </Button>
      </div>

      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative bg-[#030712] px-4">
          <span className="text-gray-400 text-sm font-medium">OR</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleBtn />
        <GithubBtn />
      </div>
      <div className="flex w-full items-center justify-center mt-3 gap-1">
        <span className="font-sans text-sm text-white">
          Already have an account?
        </span>
        <NavLink
          to={'/auth/log-in'}
          className="font-sans text-sm text-[#99A1AF] font-semibold hover:text-white"
        >
          Login here
        </NavLink>
      </div>
    </FormBackground>
  );
};

export default SignUpForm;
