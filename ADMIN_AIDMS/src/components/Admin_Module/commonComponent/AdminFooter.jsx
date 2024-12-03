import React, { memo, useContext } from "react";
import { ThemeContext } from "../../../contextAPI/ThemeContext";
function AdminFooter() {
  const { theme } = useContext(ThemeContext);

  // Define theme-specific classes
  const footerBgClass = theme === "light" ? "bg-[#1C4E80]" : "bg-[#1E201E]";
  const textColorClass =
    theme === "light" ? "text-[#E2DFD0]" : "text-[#EEEEEE]";
  const textSizeClass = theme === "light" ? "text-xl" : "text-xl";
  const copyrightTextClass =
    theme === "light" ? "text-xs text-[#E2DFD0]" : "text-xs text-[#EEEEEE]";

  return (
    <div
      className={`flex flex-col py-2 items-center justify-center ${footerBgClass}`}
    >
      <div className={`${textColorClass} ${textSizeClass} font-bold`}>
        Website owned & maintained by: Centre for Development of Advanced
        Computing (C-DAC)
      </div>
      <div className={copyrightTextClass}>
        © 2024 C-DAC. All rights reserved. 2023
      </div>
    </div>
  );
}

export default memo(AdminFooter);
