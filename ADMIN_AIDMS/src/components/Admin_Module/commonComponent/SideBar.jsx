import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Adminlogo.png";
import {
  Building2,
  LaptopMinimalCheck,
  Settings,
  UserCheck,
  Columns3,
  GraduationCap,
  Bot,
  ChevronDown,
  ChevronUp,
  MdBloodtype,
} from "lucide-react";
import { SideBarToggleContext } from "../../../contextAPI/SideBarToggleContext";
import { ThemeContext } from "../../../contextAPI/ThemeContext";

function SideBar() {
  const { expanded, setExpanded } = useContext(SideBarToggleContext);
  const { theme } = useContext(ThemeContext);
  const [expandedMenus, setExpandedMenus] = useState({});

  const items = [
    {
      id: 1,
      icon: <LaptopMinimalCheck size={30} />,
      text: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      id: 2,
      icon: <Building2 size={30} />,
      text: "Organization Management",
      link: "/organization",
      isExpandable: true,
      subOptions: [
        { id: "2-1", text: "Department Master", link: "" },
        // { id: "2-2", text: "Bot Answer", link: "botanswer" },
      ],
    },
    {
      id: 3,
      icon: <Settings size={30} />,
      text: "Service Management",
      link: "/services",
    },
    {
      id: 4,
      icon: <UserCheck size={30} />,
      text: "Role Management",
      link: "/roles",
    },
    {
      id: 5,
      icon: <GraduationCap size={30} />,
      text: "Master Management",
      link: "/admin/dashboard/",
      isExpandable: true,
      subOptions: [
        { id: "5-1", text: "Salutation Master", link: "salutation" },
        {
          id: "5-2",
          text: "Organization Type Master",
          link: "organization",
        },
        { id: "5-3", text: "Country Master", link: "country" },
        { id: "5-4", text: "State Master", link: "state" },
        { id: "5-5", text: "District Master", link: "district" },
        { id: "5-6", text: "Blood Group", link: "blood" },
      ],
    },
    {
      id: 6,
      icon: <Bot size={30} />,
      text: "ChatBot Management",
      link: "/admin/dashboard/",
      isExpandable: true,
      subOptions: [
        { id: "6-1", text: "Bot Question", link: "botquestion" },
        { id: "6-2", text: "Bot Answer", link: "botanswer" },
      ],
    },
  ];

  const toggleMenu = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getThemeClasses = (key) => {
    if (key === "text")
      return theme === "light" ? "text-[#E2DFD0]" : "text-[#EEEEEE]";
    if (key === "bg")
      return theme === "light" ? "bg-[#1C4E80]" : "bg-[#1E201E]";
    return "";
  };

  return (
    <aside
      className={`transition-all h-screen duration-500 ease-in-out ${
        expanded ? "w-64" : "w-20"
      } h-full`}
    >
      <nav
        className={`flex flex-col shadow-sm ${getThemeClasses("bg")} h-full`}
      >
        <div className="flex items-center p-4">
          <img
            src={Logo}
            alt="Admin Logo"
            className={`transition-all flex items-center justify-center mt-4 duration-300 rounded-full ${
              expanded ? "w-40 h-20" : "w-10 h-10"
            }`}
          />
        </div>
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            className="p-1.5 rounded-lg bg-gray-400 hover:bg-gray-600"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label="Toggle Sidebar"
          >
            <Columns3 size={30} />
          </button>
        </div>
        <ul className="flex-1 px-3">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <li
                className={`relative flex px-3 py-2 my-1 items-center rounded-md cursor-pointer transition-colors group ${getThemeClasses(
                  "text"
                )}`}
                onClick={() => item.isExpandable && toggleMenu(item.id)}
                aria-expanded={!!expandedMenus[item.id]}
              >
                {item.isExpandable ? (
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      {item.icon}
                      <span
                        className={`overflow-hidden transition-all ${
                          expanded ? "w-32 ml-3" : "w-0"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                    {expanded && (
                      <div className="ml-3">
                        {expandedMenus[item.id] ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.link} className="flex items-center w-full">
                    {item.icon}
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32 ml-3" : "w-0"
                      }`}
                    >
                      {item.text}
                    </span>
                  </Link>
                )}
              </li>
              {item.isExpandable && expandedMenus[item.id] && (
                <ul className={`pl-10 ${expanded ? "block" : "hidden"}`}>
                  {item.subOptions.map((subOption) => (
                    <li key={subOption.id} className="py-1">
                      <Link
                        to={subOption.link}
                        className={`block py-1 ${getThemeClasses("text")}`}
                      >
                        {subOption.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
