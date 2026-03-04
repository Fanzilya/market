// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import CustomerPage from './pages/CustomerPage.jsx'
import SupplierPage from './pages/SupplierPage.jsx'
import RequestDetailPage from './pages/RequestDetailPage.jsx'
import CreateRequestPage from './pages/CreateRequestPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx' // Новый импорт
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getSessionUser } from './auth/demoAuth.js'

export default function App() {
  // Функция для редиректа на правильную страницу заявок в зависимости от роли
  const getRequestsPath = () => {
    const user = getSessionUser()
    if (!user) return '/login'
    return user.role === 'customer' ? '/customer' : '/supplier'
  }

  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Защищённые маршруты */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } 
      />

      {/* Новый маршрут для уведомлений */}
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } 
      />

      {/* Маршруты для заказчика */}
      <Route 
        path="/customer" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/request/new" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateRequestPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/request/:requestId" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <RequestDetailPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/request/:requestId/edit" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateRequestPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/request/:requestId/offers" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <OffersPage />
          </ProtectedRoute>
        } 
      />

      {/* Маршруты для поставщика */}
      <Route 
        path="/supplier" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/supplier/request/:requestId" 
        element={
          <ProtectedRoute allowedRoles={['supplier']}>
            <RequestDetailPage />
          </ProtectedRoute>
        } 
      />

      {/* Редирект на правильную страницу заявок */}
      <Route 
        path="/requests" 
        element={<Navigate to={getRequestsPath()} replace />} 
      />

      {/* Редирект на главную для всех остальных маршрутов */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}