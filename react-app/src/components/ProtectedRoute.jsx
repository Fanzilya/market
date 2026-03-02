import { Navigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getSessionUser()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Перенаправляем на соответствующую страницу по роли
    if (user.role === 'customer') {
      return <Navigate to="/customer" replace />
    }
    if (user.role === 'supplier') {
      return <Navigate to="/supplier" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return children
}