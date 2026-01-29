import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import TextField from '@/components/ui/text-field';
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
    <FormBackground className="w-113 h-fit flex flex-col gap-4">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold">Welcome To OPOM</h1>
        <h5 className="text-gray-400">Subtitle</h5>
      </div>

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
      >
        {isLoading ? 'Checking Email' : 'Continue'}
      </Button>

      <h3 className="text-white text-center">OR</h3>

      <div className="flex flex-col gap-7">
        <GoogleBtn />
        <GithubBtn />
      </div>
    </FormBackground>
  );
};

export default SignUpForm;
