import { Outlet } from 'react-router-dom';
import Background from '../background';
import Sidebar from '../sidebar';

const AdminLayout = () => {
  return (
 
    <Background className="flex w-screen min-h-screen overflow-hidden">
      
  
      <aside className="flex-none h-full  w-2xs ">
        <Sidebar />
      </aside>

    
      <main className="flex-1 h-full overflow-y-auto p-6">
        <Outlet />
      </main>

    </Background>
  );
};

export default AdminLayout;