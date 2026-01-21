import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@radix-ui/themes';
export default function MainLayout() {
  const { auth, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto">
        <div className="w-11/12 mx-auto">
          <Navbar Auth={auth} />
        </div>

        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>

        <div className="w-11/12 mx-auto">
          <Footer />
        </div>
      </div>
    </Background>
  );
}
