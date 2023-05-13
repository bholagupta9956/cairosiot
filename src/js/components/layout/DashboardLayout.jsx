import React, { useState } from "react";

import SideBarV2 from '../standard/SidebarV2.jsx';
import Header from '../standard/Header.jsx';
import "./layout.css";

const DashboardLayout = props => {

  const [ active, setActive ] = useState(false);

  return (
    <div className="bg-background min-h-screen">
        <Header isHamburgerOpen={active} onHamburgerPress={() => setActive(!active)} />
        <div className="flex dashboardCont">
          <SideBarV2 isOpen={active} onBackdropClick={() => setActive(false)} />
          <div className="flex-1 px-4">
            {props.children}
          </div>
        </div>
    </div>
  );
}

export default DashboardLayout;