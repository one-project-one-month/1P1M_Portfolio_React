import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <div className="text-2xl text-blue-600">Hello world</div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
