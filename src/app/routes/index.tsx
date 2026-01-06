import { MainLayout } from '@/constants/lazyload';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([{
    path:"/",element:<MainLayout />,children:[]
}]);

export default router;
