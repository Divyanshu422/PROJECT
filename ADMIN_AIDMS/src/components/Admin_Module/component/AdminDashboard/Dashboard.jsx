import React from "react";
import AdminFooter from "../../commonComponent/AdminFooter";
import AdminHeader from "../../commonComponent/AdminHeader";
import SideBar from "../../commonComponent/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex max-h-screen">
      {/* Sidebar */}
      <SideBar className="w-64 bg-gray-800 text-white fixed h-full z-10" />

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <AdminHeader className="bg-gray-200 sticky top-0 z-20" />

        {/* Outlet for dynamic content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </div>

        {/* Footer */}
        <AdminFooter className="fixed bg-gray-200 mt-auto" />
      </div>
    </div>
  );
};

export default Dashboard;
