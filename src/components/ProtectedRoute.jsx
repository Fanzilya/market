// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = getSessionUser()

  // Если пользователь не авторизован - редирект на логин
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Если указаны разрешенные роли и роль пользователя не подходит
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Редирект на дашборд с сообщением в консоль
    console.warn(`Доступ запрещен. Требуется роль: ${allowedRoles.join(', ')}`)
    return <Navigate to="/dashboard" replace />
  }

  // Если всё хорошо - отображаем дочерний компонент
  return children
}