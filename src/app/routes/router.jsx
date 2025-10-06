import { createBrowserRouter } from "react-router-dom";
import { DevProfilePage, MainLayout,AdminLayout,RegisterListPage,ProjectListPage  } from "../constants/lazyload";
import authRouter from "./authRouter";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "setup-profile", element: <DevProfilePage /> }],
  },
  {path:"/admin",
    element:<AdminLayout/>,
    children:[
      // {index:true,element:<RegisterListPage/>},
      {index:true,element:<ProjectListPage/>}
      ]
  },
  ...authRouter,
]);

export default router;
