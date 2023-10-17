import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login Page/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";
import DietisianHomepage from "./Pages/Dietisian/Homepage"
import Try from "./Pages/Try/try";
import LandingPage from "./Pages/Landing Page/LandingPages";

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
    path: "/dietisian/",
    element: <DietisianHomepage />,
  },
  {
    path: "/try",
    element: <Try />,
  }
]);

export default Router;
