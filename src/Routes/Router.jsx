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
import Cart from '../Pages/Cart/Cart';
import Canceled from '../Pages/Payment/Canceled';
import InvoiceLayout from '../Layouts/InvoiceLayout';
import ManagePayments from '../Pages/Dashboard/Admin/ManagePayments/ManagePayments';
import MyPayments from '../Pages/Dashboard/User/MyPayments/MyPayments';
import DashboardRouteElement from '../Pages/Dashboard/Others/DashboardRouteElement';
import PaymentHistory from '../Pages/Dashboard/Seller/PaymentHistory/PaymentHistory';
import SalesReport from '../Pages/Dashboard/Admin/SalesReport/SalesReport';
import AskForAdvertisement from '../Pages/Dashboard/Seller/AskForAdvertisement/AskForAdvertisement';

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
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'canceled',
        element: <Canceled />,
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
        index: true,
        element: <DashboardRouteElement />,
      },
      {
        path: 'manage-categories',
        element: <ManageCategories />,
      },
      {
        path: 'manage-payments',
        element: <ManagePayments />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
      },
      {
        path: 'manage-medicine',
        element: <ManageMedicine />,
      },
      {
        path: 'sales-report',
        element: <SalesReport />
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
      },
      {
        path: 'ask-for-advertisement',
        element: <AskForAdvertisement />
      },
      {
        path: 'payments',
        element: <MyPayments />,
      },
    ],
  },
  {
    path: '/complete',
    element: <InvoiceLayout />,
  },
]);
