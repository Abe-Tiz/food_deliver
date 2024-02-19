import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/UpdateProfile";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Order from "../pages/dashboard/Order";
import Dashbord from "../pages/dashboard/admin/Dashbord";
import Users from "../pages/dashboard/admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update_profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashbord />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
