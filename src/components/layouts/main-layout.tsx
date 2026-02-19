import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

export default function MainLayout() {
  const user = useUserInfoStore((state) => state.userInfo);

  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto overflow-x-hidden">
        <div className="w-full px-16 mx-auto">
          <Navbar auth={user ?? null} />
        </div>
        <div className="max-w-3/4 px-5 mx-auto">
          <Outlet />
          <Footer />
        </div>
      </div>
    </Background>
  );
}
