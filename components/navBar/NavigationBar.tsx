import React from "react";
import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavBarRight";
import NavbarCenter from "./NavBarCenter";

export default function NavigationBar() {
  return (
    <nav className="hidden sm:block p-4 pt-2 pb-2">
      <div className="flex justify-between">
        <NavbarLeft />
        <NavbarCenter />
        <NavbarRight />
      </div>
    </nav>
  );
}
