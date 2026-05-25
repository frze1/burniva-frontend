import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import useAuthStore from '../store/auth/useAuthStore'

function PublicRoute() {
  const token = localStorage.getItem('token')
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)

  return token && isAuthenticated
    ? <Navigate to={ROUTES.DASHBOARD} replace />
    : <Outlet />
}

export default PublicRoute