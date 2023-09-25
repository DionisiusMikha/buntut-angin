import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/LoginPages/UserLoginPage/LoginPage.jsx";
import Register from "./Pages/LoginPages/UserLoginPage/RegisterPage.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

export default Router;
