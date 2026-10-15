import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/DashBoard";
import Profile from "./pages/Dashboard/Profile/Profile";
import FoodLog from "./pages/Dashboard/Food/FoodLog";
import ActivityLog from "./pages/Dashboard/Activity/ActivityLog";
import Home from "./pages/Dashboard/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import ServerWakeUp from "./pages/ServerWakeUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "foodlog",
            element: <FoodLog />,
          },
          {
            path: "activitylog",
            element: <ActivityLog />,
          },
          {
            index: true,
            element: <Home />,
          },
        ],
      },

      {
        path: "onboarding",
        element: <Onboarding />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "coldstart",
    element: <ServerWakeUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
