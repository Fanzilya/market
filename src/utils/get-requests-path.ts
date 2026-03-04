import { getSessionUser } from "../auth/demoAuth"

export const getRequestsPath = () => {
    const user = getSessionUser()
    if (!user) return '/login'
    return user.role === 'customer' ? '/customer' : '/supplier'
  }