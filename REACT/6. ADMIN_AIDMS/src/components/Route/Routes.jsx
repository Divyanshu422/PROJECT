import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "../Login/Pages/SignIn";
import SignInOTP from "../Login/Pages/SignInOTP";
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
      element: (
        <AdminProtectedRoutes>
          <AdminDashboard />
        </AdminProtectedRoutes>
      ),
    },
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
};
export default Routes;
