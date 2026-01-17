import Background from '@/components/background';
import LoginForm from './components/login-form';

export default function LoginPage() {
  return (
    <main className="">
      <Background className="h-screen flex items-center w-full justify-center">
        <div className=" w-full h-full flex justify-center items-center ">
          <div className="flex justify-center items-center border border-[#1E2939] rounded-3xl">
            <LoginForm />
          </div>
        </div>
      </Background>
    </main>
  );
}
