import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
export default function MainLayout() {
  const user = useUserInfoStore.getState().userInfo;

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
