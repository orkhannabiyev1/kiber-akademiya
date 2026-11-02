import { createBrowserRouter } from 'react-router-dom'
import { GuestOnlyRoute, ProtectedRoute } from '@/auth/RouteGuards'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LessonLayout } from '@/layouts/LessonLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/HomePage'
import { LessonPage } from '@/pages/LessonPage'
import { LoginPage } from '@/pages/LoginPage'
import { ModulePage } from '@/pages/ModulePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PathPage } from '@/pages/PathPage'
import { SignupPage } from '@/pages/SignupPage'

// Vite's BASE_URL ("/repo/") → Router basename ("/repo"). Change it via VITE_BASE_PATH.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const router = createBrowserRouter(
  [
    { path: '/', element: <HomePage /> },
    {
      element: <GuestOnlyRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/path/:pathSlug', element: <PathPage /> },
            { path: '/path/:pathSlug/module/:moduleSlug', element: <ModulePage /> },
          ],
        },
        { element: <LessonLayout />, children: [{ path: '/path/:pathSlug/module/:moduleSlug/lesson/:lessonSlug', element: <LessonPage /> }] },
      ],
    },
    { element: <PublicLayout />, children: [{ path: '*', element: <NotFoundPage /> }] },
  ],
  { basename },
)
