import React, { memo } from "react";

function Header() {
  return (
    <div>
      <header className="w-full p-2 text-center bg-[#1673EC] text-white">
        <h1 className="text-xl font-bold">
          AI Based Document Management System - AIDMS
        </h1>
      </header>
    </div>
  );
}

export default memo(Header);
