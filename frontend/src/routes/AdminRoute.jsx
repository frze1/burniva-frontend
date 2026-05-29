import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/auth/useAuthStore';

function AdminRoute() {
  const token = localStorage.getItem('token');
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
