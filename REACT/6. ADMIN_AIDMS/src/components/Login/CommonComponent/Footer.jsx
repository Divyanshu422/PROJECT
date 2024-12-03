import React, { memo, useContext } from "react";
import { ThemeContext } from "../../../contextAPI/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col py-2 px-4 items-center justify-center ${
        theme === "light" ? "bg-[#1673EC]" : "bg-[#1E201E]"
      }`}
    >
      <div
        className={`${
          theme === "light" ? "text-[#E2DFD0]" : "text-[#EEEEEE]"
        } text-center font-medium text-sm sm:text-base`}
      >
        Website owned & maintained by: Centre for Development of Advanced
        Computing (C-DAC)
      </div>
      <div
        className={`${
          theme === "light" ? "text-[#E2DFD0]" : "text-[#EEEEEE]"
        } text-center text-xs sm:text-sm mt-1`}
      >
        © 2024 C-DAC. All rights reserved.
      </div>
    </div>
  );
}

export default memo(Footer);
