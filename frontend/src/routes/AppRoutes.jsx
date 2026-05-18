import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute    from './PublicRoute'
import MainLayout     from '../components/layout/MainLayout'

// PASTIKAN IMPOR SEPERTI INI (Tanpa tanda kurung kurawal {})
import ScrollToTop from '../components/common/ScrollToTop' 

import Landing   from '../pages/Landing'
import Login     from '../pages/Login'
import Register  from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Input     from '../pages/Input'
import Result    from '../pages/Result'
import Todo      from '../pages/Todo'
import History   from '../pages/History'
import Profile   from '../pages/Profile'

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Komponen diletakkan di sini, tepat di dalam BrowserRouter */}
      <ScrollToTop /> 

      <Routes>
        <Route path={ROUTES.HOME} element={<Landing />} />

        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN}    element={<Login />}    />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.INPUT}     element={<Input />}     />
            <Route path={ROUTES.RESULT}    element={<Result />}    />
            <Route path={ROUTES.TODO}      element={<Todo />}      />
            <Route path={ROUTES.HISTORY}   element={<History />}   />
            <Route path={ROUTES.HISTORY_DETAIL} element={<Result />} />
            <Route path={ROUTES.PROFILE}   element={<Profile />}   />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes