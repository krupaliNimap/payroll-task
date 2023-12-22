import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import MyTask from "../components/myTask/MyTask";
import HomeLayout from "../layout/HomeLayout";
import Billing from "../components/billing/Billing";
import Setting from "../components/settings/Setting";
import MyTeams from "../components/myTeams/MyTeams";
import Login from "../components/login/Login";

export const PrivateRouting = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-task",
        element: <MyTask />,
      },
      {
        path: "/my-teams",
        element: <MyTeams />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
    ],
  },
]);

export default PrivateRouting;
