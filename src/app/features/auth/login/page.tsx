import Background from '@/components/background';
import LoginForm from './components/login-form';

export default function LoginPage() {
  return (
    <main className="w-screen h-screen">
      <Background className="h-screen flex items-center justify-center">
        <div className="w-[468px] h-[448px] border border-[#1E2939] rounded-3xl">
          <LoginForm />
        </div>
      </Background>
    </main>
  );
}
