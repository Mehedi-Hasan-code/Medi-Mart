import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])