import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

export default function MainLayout() {
  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto">
        <div className="w-11/12 mx-auto">
          <Navbar />
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
