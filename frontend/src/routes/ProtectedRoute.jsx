import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import useAuthStore from '../store/auth/useAuthStore'

function ProtectedRoute() {
  const token = localStorage.getItem('token')
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)

  return token && isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.LOGIN} replace />
}

export default ProtectedRoute