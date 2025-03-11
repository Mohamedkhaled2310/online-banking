import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
