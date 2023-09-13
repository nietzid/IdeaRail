import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';

const PrivateRoutes = () => {
    const { user } = useAuth();
    const location = useLocation();
    return user ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    );
}

export default PrivateRoutes