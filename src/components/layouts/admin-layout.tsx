import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import Background from '../background';
import Heading from '../heading';
import Sidebar from '../sidebar';

const AdminLayout = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <Background className="w-full h-screen">
      <div className="flex w-full h-full overflow-hidden">
        <aside className="w-64 shrink-0 h-full">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col h-full">
          <div className="shrink-0">
            <Heading auth={auth} />
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
