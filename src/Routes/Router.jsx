import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Forbidden from '../Pages/Others/Forbidden';
import DashboardLayout from '../Layouts/DashboardLayout';
import ManageCategories from '../Pages/Dashboard/Admin/ManageCategories/ManageCategories';
import Login from '../Pages/Login/Login';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers/ManageUsers';
import ManageMedicine from '../Pages/Dashboard/Seller/ManageMedicine/ManageMedicine';
import CategoryDetails from '../Pages/CategoryDetails/CategoryDetails';
import Shop from '../Pages/Shop/Shop';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'details',
        element: <CategoryDetails />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forbidden',
        element: <Forbidden />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'manage-categories',
        element: <ManageCategories />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
      },
      {
        path: 'manage-medicine',
        element: <ManageMedicine />,
      },
    ],
  },
]);
