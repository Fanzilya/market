// components/ProtectedRoute.tsx
import { Role } from '@/entities/user/role'
import { useAuth } from '@/features/user/context/context'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  allowedRoles: Role[]
}

export const ProtectedRoute = ({ allowedRoles = [] }: Props) => {
  const { user } = useAuth()

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
  return <Outlet />
}