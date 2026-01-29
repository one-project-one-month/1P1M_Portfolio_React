import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Spinner } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
export default function MainLayout() {
  const user = useUserInfoStore.getState().userInfo;

  if (!user)
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto">
        <div className="w-11/12 mx-auto">
          <Navbar auth={user ?? null} />
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
