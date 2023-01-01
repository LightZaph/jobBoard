import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = ({allowesRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.roles?.find(role => allowesRoles?.includes(role))
        ? <Outlet/>
        : auth?.email
        ? <Navigate to="/unauthorized" state={{from: location}} replace />
        : <Navigate to='/login' state={{from: location}} replace />
    )
};

export default RequiredAuth;