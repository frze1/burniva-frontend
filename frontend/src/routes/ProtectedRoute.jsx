import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import useAuthStore from '../store/auth/useAuthStore'

function ProtectedRoute() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.LOGIN} replace />
}

export default ProtectedRoute