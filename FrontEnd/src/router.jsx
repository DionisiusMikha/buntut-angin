import { createBrowserRouter } from "react-router-dom";
import Loader from "./Component/Loader";
import Try from "./Pages/Try/try";

// Dashboard
import LandingPage from "./Pages/Landing Page/LandingPages";
import Login from "./Pages/Login Page/LoginPage";
import Register from "./Pages/Register Page/RegisterPage";
import SendEmail from "./Pages/Login Page/SendEmail";
import OTPinput from "./Pages/Login Page/OTPinput";
import ResetPassword from "./Pages/Login Page/ResetPassword";
import Recovered from "./Pages/Login Page/Recovered";

// Dietisian
import DietisianHomepage from "./Pages/Dietisian/Homepage"
import DashboardDietisian from './Pages/Dietisian/components/home';
import RecipesDietisian from './Pages/Dietisian/components/recipes';
import DietisianDetailRecipes from './Pages/Dietisian/components/DetailRecipes';
import ReportDietisian from './Pages/Dietisian/components/report';
import ChatDietisian from './Pages/Dietisian/components/chat';
import ChatsDietisian from './Pages/Dietisian/components/ChatHome';
import BlankChatDietisian from './Pages/Dietisian/components/blankChat';
import ProfileDietisian from "./Pages/Dietisian/components/Profile";
import SubscriptionsDietisian from "./Pages/Dietisian/components/Subscriptions";

// Konsultan
import KonsultanHomepage from './Pages/Konsultan/Homepage';
import DashboardKonsultan from './Pages/Konsultan/components/home';
import RecipesKonsultan from './Pages/Konsultan/components/recipes';
import ChatKonsultan from './Pages/Konsultan/components/chat';
import BlankChatKonsultan from './Pages/Konsultan/components/blankChat';
import PatientListKonsultan from './Pages/Konsultan/components/patientList';
import SettingsKonsultan from './Pages/Konsultan/components/settings';

// Admin
import AdminHomepage from './Pages/Admin/Homepage';
import DashboardAdmin from './Pages/Admin/Components/Home';
import RecipesAdmin from './Pages/Admin/Components/recipes';
import ListRecipes from "./Pages/Admin/Components/ListRecipes";
import DetailRecipes from "./Pages/Admin/Components/DetailRecipes";
import AddRecipe from "./Pages/Admin/Components/AddRecipe";
import EditRecipe from "./Pages/Admin/Components/EditRecipe";
import PatientListAdmin from './Pages/Admin/Components/PatientList';
import ProfileAdmin from "./Pages/Admin/Components/Profile";
import Subscriptions from "./Pages/Admin/Components/Subscriptions";
import AddNewUser from "./Pages/Admin/Components/AddNewUser";
import DetailSubs from "./Pages/Admin/Components/DetailSubs";

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
    path: "/sendemail",
    element: <SendEmail />,
  },
  {
    path: "/OTPinput",
    element: <OTPinput />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/recovered",
    element: <Recovered />,
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
        path: "recipes/:id",
        element: <DietisianDetailRecipes/>
      },
      {
        path: "report",
        element: <ReportDietisian/>
      },
      {
        path: "chat",
        element: <BlankChatDietisian/>
      },
      {
        path: "chat/:room_id",
        element: <ChatDietisian/>
      },
      {
        path : "profile",
        element : <ProfileDietisian/>,
      },
      {
        path : "subs",
        element : <SubscriptionsDietisian />,
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
      },
      {
        path: "chat",
        element: <BlankChatKonsultan/>
      },
      {
        path: "chat/:room_id",
        element: <ChatKonsultan/>
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
          },
          {
            path: ":id",
            element: <DetailRecipes/>,
          },
          {
            path: "add",
            element: <AddRecipe/>
          },
          {
            path: ":id/edit",
            element: <EditRecipe/>,
          }
        ]
      },
      {
        path: "patient-list",
        element: <PatientListAdmin/>
      },
      {
        path: "patient-list/add",
        element: <AddNewUser />
      },
      {
        path: "patient-list/detail",
        element: <ProfileAdmin/>
      },
      {
        path: "subscriptions",
        element: <Subscriptions/>
      },
      {
        path: "subscriptions/detail/:room_id",
        element: <DetailSubs />
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
