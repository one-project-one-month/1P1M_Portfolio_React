import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
export default function MainLayout() {
  const user = useUserInfoStore.getState().userInfo;

  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto overflow-x-hidden">
        <div className="max-w-7xl w-full mx-auto">
          <Navbar auth={user ?? null} />
          <Outlet />
          <Footer />
        </div>
      </div>
    </Background>
  );
}
