import Background from "@/components/ui/Background";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <Background>
      <div className="h-dvh w-dvw overflow-auto">
        <div className="w-11/12 mx-auto">
          <Navbar />
        </div>

        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>
        <div className="w-11/12 mx-auto mt-16">
          <Footer/>
        </div>
      </div>
    </Background>
  );
}

export default AdminLayout;
