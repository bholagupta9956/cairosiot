import React, { useState } from "react";
import {
    Link
} from 'react-router-dom'

const sidebarWidth = 300;

const Sidebar = props => {
    const [ active, setActive ] = useState(true);

    const positionLeft = active ? 0 : -sidebarWidth;
    return (
        <div className="z-10 fixed min-h-screen bg-primary" style={{ left: positionLeft, minWidth: 300 }}>
            <h1 className="border-b-2 border-light-50 text-heading text-center text-light font-bold py-4 mx-4"> INVENSE </h1>
            <ul>
                <li>
                    <Link to="/" className="flex items-center block p-4 cursor-pointer hover:bg-light-50 text-light font-medium font-cardSubHeading">
                        <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                        <div className="ml-2">
                            Dashboard
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
  
}

Sidebar.defaultProps = {
};

Sidebar.propTypes = {
};

export default Sidebar;