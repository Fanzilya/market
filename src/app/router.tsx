import ProtectedRoute from "@/components/ProtectedRoute";
import { getRequestsPath } from "@/utils/get-requests-path";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const AppRouter = createBrowserRouter([
  // Публичные маршруты
  {
    path: '/',
    async lazy() {
      const { LandingPage } = await import('@/pages/LandingPage');
      return { Component: LandingPage };
    },
  },
  {
    path: '/login',
    async lazy() {
      const { LoginPage } = await import('@/pages/LoginPage');
      return { Component: LoginPage };
    },
  },
  {
    path: '/register',
    async lazy() {
      const { RegisterPage } = await import('@/pages/RegisterPage');
      return { Component: RegisterPage };
    },
  },
  {
    path: '/forgot-password',
    async lazy() {
      const { ForgotPasswordPage } = await import('@/pages/ForgotPasswordPage');
      return { Component: ForgotPasswordPage };
    },
  },

  // Защищённые маршруты
  {
    path: '/dashboard',
    async lazy() {
      const { DashboardPage } = await import('@/pages/DashboardPage');
      return {
        Component: () => (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/profile',
    async lazy() {
      const { ProfilePage } = await import('@/pages/ProfilePage');
      return {
        Component: () => (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/settings',
    async lazy() {
      const { SettingsPage } = await import('@/pages/SettingsPage');
      return {
        Component: () => (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/notifications',
    async lazy() {
      const { NotificationsPage } = await import('@/pages/NotificationsPage');
      return {
        Component: () => (
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        ),
      };
    },
  },

  // Маршруты для заказчика
  {
    path: '/customer',
    async lazy() {
      const { CustomerPage } = await import('@/pages/CustomerPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/customer/request/new',
    async lazy() {
      const { CreateRequestPage } = await import('@/pages/customer/form-request-page/CreateRequestPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateRequestPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/customer/request/:requestId',
    async lazy() {
      const { RequestDetailPage } = await import('@/pages/RequestDetailPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['customer']}>
            <RequestDetailPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/customer/request/:requestId/edit',
    async lazy() {
      const { CreateRequestPage } = await import('@/pages/customer/form-request-page/CreateRequestPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateRequestPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/customer/request/:requestId/offers',
    async lazy() {
      const { OffersPage } = await import('@/pages/OffersPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['customer']}>
            <OffersPage />
          </ProtectedRoute>
        ),
      };
    },
  },

  // Маршруты для поставщика
  {
    path: '/supplier',
    async lazy() {
      const { SupplierPage } = await import('@/pages/SupplierPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierPage />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/supplier/request/:requestId',
    async lazy() {
      const { RequestDetailPage } = await import('@/pages/RequestDetailPage');
      return {
        Component: () => (
          <ProtectedRoute allowedRoles={['supplier']}>
            <RequestDetailPage />
          </ProtectedRoute>
        ),
      };
    },
  },

  // Редиректы
  {
    path: '/requests',
    element: <Navigate to={getRequestsPath()} replace />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
