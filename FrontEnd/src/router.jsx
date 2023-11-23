import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login Page/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";
import DietisianHomepage from "./Pages/Dietisian/Homepage"
import Try from "./Pages/Try/try";
import LandingPage from "./Pages/Landing Page/LandingPages";
import Loader from "./Component/Loader";
import ProfileDietisian from "./Pages/Dietisian/Profile";
import KonsultanHomepage from "./Pages/Konsultan/Homepage";

// Dietisian
import Home from './Pages/Dietisian/components/home';
import Recipes from './Pages/Dietisian/components/recipes';
import Report from './Pages/Dietisian/components/report';
import Chat from './Pages/Dietisian/components/chat';

// Konsultan
// Admin

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
  {
    path: "/dietisian",
    element: <DietisianHomepage />,
    children: [
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "recipes",
        element: <Recipes/>
      },
      {
        path: "report",
        element: <Report/>
      },
      {
        path: "chat",
        element: <Chat/>
      }
    ]
  },
  {
    path: "/konsultan",
    element: <KonsultanHomepage />,
    children: [
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "recipes",
        element: <Recipes/>
      },
      {
        path: "report",
        element: <Report/>
      },
      {
        path: "chat",
        element: <Chat/>
      }
    ]
  },
  {
    path : "/dietisian/profile",
    element : <ProfileDietisian/>,
  },
  {
    path: "/try",
    element: <Try />,
  }
]);

export default Router;
