import { Role } from "@/entities/user/role"
import { useAuth } from "@/features/user/context/context"

export const getRequestsPath = () => {
  const { user } = useAuth()
  if (user) return user.role === Role.Admin ? '/admin' : (user.role == Role.Customer ? '/customer' : '/supplier')
  return "/"
}