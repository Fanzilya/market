import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/features/user/context/context'
import { AppRouter } from './routers/router'
import './main.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/libs/query-client'

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' />

        <RouterProvider router={AppRouter} />
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider >
  </StrictMode >
)
