import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login Page/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";
import DietisianHomepage from "./Pages/Dietisian/Homepage"
import Try from "./Pages/Try/try";
import LandingPage from "./Pages/Landing Page/LandingPages";
import Loader from "./Component/Loader";
import SideNavbar from "./Component/SideNavbar";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/loading",
    element: <Loader />,
  },
  {
    path: "/registersuccess",
    element: <Loader />,
  },
  // {
  //   path: "/dietisian/",
  //   element: <DietisianHomepage />,
  // },
  {
    // path: "/dietisian/",
    element: <SideNavbar />,
    // errorElement: <ErrorElement />,
    children: [
        { path: "/dietisian/", element: <DietisianHomepage /> },
      ],
    },
  {
    path: "/try",
    element: <Try />,
  }
]);

export default Router;
