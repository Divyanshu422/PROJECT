import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "../Login/Pages/SignIn";
import SignInOTP from "../Login/Pages/SignInOTP";
import AdminProtectedRoutes from "../../utils/ProtectedRoutes/AdminProtectedRoutes";
import AdminDashboard from "../Admin_Module/component/AdmainDashboard/Dashboard";
const Routes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signotp",
      element: <SignInOTP />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
};
export default Routes;
