import { createBrowserRouter } from "react-router-dom";
import Loader from "./Component/Loader";

// Dashboard
import LandingPage from "./Pages/Landing Page/LandingPages";
import Login from "./Pages/Login Page/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";

// Dietisian
import DietisianHomepage from "./Pages/Dietisian/Homepage"
import DashboardDietisian from './Pages/Dietisian/components/home';
import RecipesDietisian from './Pages/Dietisian/components/recipes';
import ReportDietisian from './Pages/Dietisian/components/report';
import ChatDietisian from './Pages/Dietisian/components/chat';
import ProfileDietisian from "./Pages/Dietisian/Profile";

// Konsultan
import KonsultanHomepage from './Pages/Konsultan/Homepage';
import DashboardKonsultan from './Pages/Konsultan/components/home';
import RecipesKonsultan from './Pages/Konsultan/components/recipes';
import PatientListKonsultan from './Pages/Konsultan/components/patientList';
import SettingsKonsultan from './Pages/Konsultan/components/settings';

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
        element: <DashboardDietisian/>
      },
      {
        path: "recipes",
        element: <RecipesDietisian/>
      },
      {
        path: "report",
        element: <ReportDietisian/>
      },
      {
        path: "chat",
        element: <ChatDietisian/>
      },
      {
        path : "profile",
        element : <ProfileDietisian/>,
      },
    ]
  },
  {
    path: "/konsultan",
    element: <KonsultanHomepage />,
    children: [
      {
        path: "home",
        element: <DashboardKonsultan/>
      },
      {
        path: "recipes",
        element: <RecipesKonsultan/>
      },
      {
        path: "patient-list",
        element: <PatientListKonsultan/>
      },
      {
        path: "settings",
        element: <SettingsKonsultan/>
      }
    ]
  }
]);

export default Router;
