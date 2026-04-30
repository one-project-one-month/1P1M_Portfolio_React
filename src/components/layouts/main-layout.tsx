import Background from '@/components/background';
import Navbar from '@/components/navbar';
import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import FooterNav from '../footer-nav';
import { useIsNative } from '@/hooks/use-is-native';
import MobileHeader from '../mobile-header';

export default function MainLayout() {
  const user = useUserInfoStore((state) => state.userInfo);
  const isNative=useIsNative();

  return (
    <Background>
      <div
        className="h-dvh w-dvw overflow-y-auto overflow-x-hidden"
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-28 mx-auto 2xl:max-w-[70%]">
          {!isNative ? <Navbar auth={user ?? null} />: <MobileHeader auth={user ?? null} /> }
        </div>
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-28 mx-auto 2xl:max-w-[70%]">
          <Outlet />
          
          <div className=''>
            
            {isNative ? <FooterNav /> : <Footer />}
          </div>
        </div>
      </div>
    </Background>
  );
}
