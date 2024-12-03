import React, { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../../../contextAPI/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextAPI/AuthContext";
import { motion } from "framer-motion";
import User_Image from "../../Assets/User_Image.png";

const AdminHeader = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Framer Motion Animations
  const defaultAnimations = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const toggleMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`w-full px-8 py-4 transition-all duration-500 ease-in-out ${
        theme === "light" ? "bg-[#1C4E80]" : "bg-[#1E201E]"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Section: Animated Greetings */}
        <div>
          <motion.p
            className={`text-sm font-bold ${
              theme === "light" ? "text-white" : "text-[#D1D1D2]"
            }`}
            initial="hidden"
            animate="show"
            variants={defaultAnimations}
            transition={{ duration: 1 }}
          >
            Hi Admin
          </motion.p>
          <motion.div
            className={`text-lg font-bold mt-2 ${
              theme === "light" ? "text-gray-200" : "text-[#D1D1D2]"
            }`}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.05, duration: 1.5 }}
          >
            {"Welcome to AIDMS".split("").map((char, index) => (
              <motion.span key={index} variants={defaultAnimations}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right Section: User Info and Theme Toggle */}
        <div className="flex items-center gap-6">
          {/* User Avatar */}
          <div className="relative">
            <img
              src={User_Image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200"
              onClick={handleDropDownToggle}
            />
            {isDropDownOpen && (
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg transition-all ${
                  theme === "light"
                    ? "bg-[#134B70] text-[#E2DFD0]"
                    : "bg-[#2C2C2C] text-white"
                }`}
              >
                <ul className="list-none">
                  <li
                    className="p-3 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="p-3 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </li>
                  <li
                    className="p-3 hover:bg-red-600 rounded cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            aria-label="Toggle Theme"
            className={`text-xl font-bold transition-transform hover:scale-110 ${
              theme === "light" ? "text-white" : "text-yellow-500"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
