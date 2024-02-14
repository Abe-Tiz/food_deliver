import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/UpdateProfile";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

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
        element: <PrivateRouter><Menu /></PrivateRouter>,
      },
      {
        path: "/update_profile",
        element:<UpdateProfile />
      },
      {
        path: "/cart-page",
        element:<CartPage />
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
