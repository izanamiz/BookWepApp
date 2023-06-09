import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/auth/login/LoginPage';
import Page404 from './pages/404/Page404';
import DashboardAppPage from './pages/dashboard/DashboardAppPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import ManageBooksPage from './pages/admin/manage-books/ManageBooksPage';
import ManageGenresPage from './pages/admin/manage-genres/ManageGenresPage';
import BooksPage from './pages/user/books/BooksPage';

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'manage-books', element: <ManageBooksPage /> },
        { path: 'manage-genres', element: <ManageGenresPage /> },
        { path: 'books', element: <BooksPage /> },

      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    }, {
      path: '/register',
      element: <RegisterPage />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
