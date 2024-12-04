import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "../Login/Pages/SignIn";
import SignInOTP from "../Login/Pages/SignInOTP";
import AdminProtectedRoutes from "../../utils/ProtectedRoutes/AdminProtectedRoutes";
import AdminDashboard from "../Admin_Module/component/AdminDashboard/Dashboard";
import SalutationMaster from "../Admin_Module/component/OutletPages/Masters/SalutationMaster";
import HomePage from "../Admin_Module/component/OutletPages/HomePage/HomePage";
import OrganizationMaster from "../Admin_Module/component/OutletPages/Masters/OrganizationMaster";
import CountryMaster from "../Admin_Module/component/OutletPages/Masters/CountryMaster";
import StateMaster from "../Admin_Module/component/OutletPages/Masters/StateMaster";
import DistrictMaster from "../Admin_Module/component/OutletPages/Masters/DistrictMaster";
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
      children: [
        { index: true, element: <HomePage /> },
        { path: "salutation", element: <SalutationMaster /> },
        { path: "organization", element: <OrganizationMaster /> },
        { path: "country", element: <CountryMaster /> },
        { path: "state", element: <StateMaster /> },
        { path: "district", element: <DistrictMaster /> },
      ],
    },
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
};
export default Routes;
