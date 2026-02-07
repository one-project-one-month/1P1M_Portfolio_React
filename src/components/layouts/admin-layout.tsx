import { Outlet } from 'react-router-dom';
import Background from '../background';
import Sidebar from '../sidebar';

const AdminLayout = () => {
  return (
    <Background className="w-full h-screen">
      <div className="flex w-full h-full overflow-hidden">
        <aside className="w-72 shrink-0 h-full">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col h-full">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </Background>
  );
};

export default AdminLayout;
