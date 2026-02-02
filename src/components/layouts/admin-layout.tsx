import { useUserInfoStore } from '@/store/user-info-store';
import { Outlet } from 'react-router-dom';
import Background from '../background';
import Heading from '../heading';
import Sidebar from '../sidebar';

const AdminLayout = () => {
  const user = useUserInfoStore.getState().userInfo;

  // if (!user) {
  //   <div>
  //     <Spinner></Spinner>
  //   </div>;
  // }

  return (
    <Background className="w-full h-screen">
      <div className="flex w-full h-full overflow-hidden">
        <aside className="w-64 shrink-0 h-full">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col h-full">
          <div className="shrink-0">
            <Heading user={user ?? null} />
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </Background>
  );
};

export default AdminLayout;
