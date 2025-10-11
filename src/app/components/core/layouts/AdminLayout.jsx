import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <Background>
      <div className="h-dvh w-dvw">
        <div className="w-11/12 mx-auto">
          <Navbar />
        </div>

        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>
      </div>
    </Background>
  );
}

export default AdminLayout;
