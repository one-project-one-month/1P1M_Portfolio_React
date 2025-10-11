import { Routes, Route } from "react-router-dom";
import UserDashboardPage from "../features/user/pages/UserDashboardPage";
import DevListPage from "../features/user/pages/DevListPage";
import UserProfilePage from "../features/user/pages/UserProfilePage";

export default function UserRouter() {
    return (
        <Routes>
            <Route path="/user/dashboard" element={<UserDashboardPage />} />
            <Route path="/user/dev-list" element={<DevListPage />} />  {/* ✅ */}
            <Route path="/user/profile" element={<UserProfilePage />} />
        </Routes>
    );
}
