import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

export default function MainLayout() {
  const user = useUserInfoStore((state) => state.userInfo);

  return (
    <Background>
      <div
        className="h-dvh w-dvw overflow-y-auto overflow-x-hidden"
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        <div className="w-full px-4 md:px-8 lg:px-16 mx-auto xl:max-w-[70%]">
          <Navbar auth={user ?? null} />
        </div>
        <div className="w-full px-4 md:px-8 lg:px-16 mx-auto xl:max-w-[70%]">
          <Outlet />
          <Footer />
        </div>
      </div>
    </Background>
  );
}
