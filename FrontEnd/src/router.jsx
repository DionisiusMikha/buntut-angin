import { createBrowserRouter } from "react-router-dom";
import Loader from "./Component/Loader";
import Try from "./Pages/Try/try";

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

// Admin
import AdminHomepage from './Pages/Admin/Homepage';
import DashboardAdmin from './Pages/Admin/Components/Home';
import RecipesAdmin from './Pages/Admin/Components/recipes';
import PatientListAdmin from './Pages/Admin/Components/PatientList';
import Subscriptions from "./Pages/Admin/Components/Subscriptions";
import ListRecipes from "./Pages/Admin/Components/ListRecipes";
import DetailRecipes from "./Pages/Admin/Components/DetailRecipes";
import AddRecipe from "./Pages/Admin/Components/AddRecipe";
import DataHandler from "./Pages/Admin/Components/DataHandler";
// import profile from "./Pages/Admin/Components/Profile";
import ProfileAdmin from "./Pages/Admin/Components/Profile";
const { loadRecipes, getRecipe } = DataHandler;


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
  },
  {
    path: "/admin",
    element: <AdminHomepage />,
    children: [
      {
        path: "home",
        element: <DashboardAdmin/>
      },
      {
        path: "recipes",
        element: <RecipesAdmin/>,
        
        children: [
          {
            path: "",
            element: <ListRecipes/>,
            // loader: loadRecipes,
          },
          {
            path: ":id",
            element: <DetailRecipes/>,
            // loader: getRecipe,
          },
          {
            path: "add",
            element: <AddRecipe/>
          },
          {
            path: ":id/edit",
            element: <RecipesAdmin/>
          }
        ]
      },
      {
        path: "patient-list",
        element: <PatientListAdmin/>
      },
      {
        path: "patient-list/detail",
        element: <ProfileAdmin/>
      },
      {
        path: "subscriptions",
        element: <Subscriptions/>
      },
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
