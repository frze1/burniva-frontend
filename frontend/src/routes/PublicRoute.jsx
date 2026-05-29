import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import useAuthStore from '../store/auth/useAuthStore'

function PublicRoute() {
  const token = localStorage.getItem('token')
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const user = useAuthStore(s => s.user)

  if (token && isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

export default PublicRoute