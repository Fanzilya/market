import { Role } from '@/entities/user/role';
import NotFoundPage from '@/moduls/errors/404';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

const protectedRoutes = [
  {
    path: 'dashboard',
    element: <ProtectedRoute allowedRoles={[Role.Customer, Role.Supplier]} />,
    async lazy() {
      const { DashboardPage } = await import('@common/pages/DashboardPage');
      return { Component: DashboardPage };
    },
  },
  {
    path: 'profile',
    element: <ProtectedRoute allowedRoles={[Role.Customer, Role.Supplier]} />,
    async lazy() {
      const { ProfilePage } = await import('@common/pages/ProfilePage');
      return { Component: ProfilePage };
    },
  },
  {
    path: 'settings',
    element: <ProtectedRoute allowedRoles={[Role.Customer, Role.Supplier]} />,
    async lazy() {
      const { SettingsPage } = await import('@common/pages/SettingsPage');
      return { Component: SettingsPage };
    },
  },
  {
    path: 'notifications',
    element: <ProtectedRoute allowedRoles={[Role.Customer, Role.Supplier]} />,
    async lazy() {
      const { NotificationsPage } = await import('@common/pages/NotificationsPage');
      return { Component: NotificationsPage };
    },
  },
];

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    async lazy() {
      const { Layout } = await import('@landing/layout/layout')
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { LandingPage } = await import('@landing/pages/LandingPage')
          return {
            Component: LandingPage
          };
        },
      },
      {
        path: 'login',
        async lazy() {
          const { LoginPage } = await import('@landing/pages/LoginPage');
          return { Component: LoginPage };
        },
      },
      {
        path: 'register',
        async lazy() {
          const { RegisterPage } = await import('@landing/pages/RegisterPage');
          return { Component: RegisterPage };
        },
      },
      {
        path: 'forgot-password',
        async lazy() {
          const { ForgotPasswordPage } = await import('@landing/pages/ForgotPasswordPage');
          return { Component: ForgotPasswordPage };
        },
      },


      // Бренды и товары
      {
        path: '/brands',
        element: <div style={{ marginTop: 20 }}><Outlet /></div>,
        children: [
          {
            index: true,
            async lazy() {
              const { BrandsPage } = await import('@shop/pages/BrandsPage');
              return { Component: BrandsPage };
            },
          },
          {
            path: ':slug',
            async lazy() {
              const { BrandPage } = await import('@shop/pages/BrandPage');
              return { Component: BrandPage };
            },
          },
          {
            path: 'product',
            children: [
              {
                path: ':id',
                async lazy() {
                  const { ProductPage } = await import('@shop/pages/ProductPage');
                  return { Component: ProductPage };
                },
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={[Role.Admin]} />,
    async lazy() {
      const { Layout } = await import('@/moduls/personal-account/_layout/layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { AdminDashboardPage } = await import('@admin/pages/AdminDashboardPage');
          return { Component: AdminDashboardPage };
        },
      },
      {
        path: 'requests',
        async lazy() {
          const { AdminPage } = await import('@admin/pages/AdminPage');
          return { Component: AdminPage };
        },
      },
      {
        path: 'users',
        async lazy() {
          const { AdminUsersPage } = await import('@admin/pages/AdminUsersPage');
          return { Component: AdminUsersPage };
        },
      },
      {
        path: 'scheme-setting',
        async lazy() {
          const { SchemeSetting } = await import('@admin/pages/SchemeSetting');
          return { Component: SchemeSetting };
        },
      },
      ...protectedRoutes,
    ]
  },

  // Заказчик
  {
    path: '/customer',
    element: <ProtectedRoute allowedRoles={[Role.Customer]} />,
    async lazy() {
      const { Layout } = await import('@/moduls/personal-account/_layout/layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { DashboardPage } = await import('@common/pages/DashboardPage');
          return { Component: DashboardPage };
        },
      },
      {
        path: 'request',
        children: [
          {
            index: true,
            async lazy() {
              const { CustomerPage } = await import('@customer/pages/request-list');
              return { Component: CustomerPage };
            },
          },
          {
            path: 'new',
            async lazy() {
              const { CreateRequestPage } = await import('@customer/pages/CreateRequestPage');
              return { Component: CreateRequestPage };
            },
          },
          {
            path: ':requestId',
            children: [
              {
                index: true,
                async lazy() {
                  const { RequestDetailPage } = await import('@common/pages/RequestDetailPage');
                  return { Component: RequestDetailPage };
                },
              },
              {
                path: 'edit',
                async lazy() {
                  const { CreateRequestPage } = await import('@customer/pages/CreateRequestPage');
                  return { Component: CreateRequestPage };
                },
              },
              {
                path: 'offers',
                async lazy() {
                  const { OffersPage } = await import('@customer/pages/OffersPage');
                  return { Component: OffersPage };
                },
              }
            ]
          },
        ]
      },

      {
        path: 'offer',
        children: [
          {
            path: ':offerId',
            children: [
              {
                index: true,
                async lazy() {
                  const { OfferDetailPage } = await import('@common/pages/OfferDetailPage');
                  return { Component: OfferDetailPage };
                },
              },
              {
                path: 'edit',
                async lazy() {
                  const { CreateOfferPage } = await import('@supplier/pages/CreateOfferPage');
                  return { Component: CreateOfferPage };
                },
              },
            ]
          },
        ],
      },

      ...protectedRoutes,
    ]
  },

  // Поставщик
  {
    path: '/supplier',
    element: <ProtectedRoute allowedRoles={[Role.Supplier]} />,

    async lazy() {
      const { Layout } = await import('@/moduls/personal-account/_layout/layout');
      return { Component: Layout };
    },
    children: [
      ...protectedRoutes,
      {
        index: true,
        async lazy() {
          const { SupplierPage } = await import('@supplier/pages/SupplierPage');
          return { Component: SupplierPage };
        },
      },
      {
        path: 'request',
        children: [
          {
            path: ':requestId',
            children: [
              {
                index: true,
                async lazy() {
                  const { RequestPreviewPage } = await import('@supplier/pages/RequestPreviewPage');
                  return { Component: RequestPreviewPage };
                },
              },
              {
                path: 'offer/new',
                async lazy() {
                  const { CreateOfferPage } = await import('@supplier/pages/CreateOfferPage');
                  return { Component: CreateOfferPage };
                },
              },

            ]
          },
        ]
      },
      {
        path: 'balance',
        async lazy() {
          const { SupplierBalancePage } = await import('@supplier/pages/SupplierBalancePage');
          return { Component: SupplierBalancePage };
        },
      },
    ]
  },
  {
    path: '*',
    // element: <Navigate to="/" replace />,
    element: <NotFoundPage />,
  },
]);
