import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import "../../../styles/header.css";
import { logout } from '../../../slices/currentUserSlice';


const Header = props => {
    const {
        isHamburgerOpen,
        onHamburgerPress
    } = props;

    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const history = useHistory();

    const { isLoading, details: userDetails } = useSelector((state) => state.currentUser);

    const dispatch = useDispatch()

    const hamburgerIcon = (
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    );

    const closeIcons = (
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    )

    const topLeftIcon = isHamburgerOpen ? closeIcons : hamburgerIcon;

    const handleLogout = () => {
        dispatch(logout())
        history.push("/login")
    }

    if (isLoading) {
        return null
    }

    return (
    <div className="z-10 flex min-w-full justify-between items-center " style={{backgroundColor : "rgb(216 216 227)"}}>
        <Link to="/" className="py-2 text-subHeading text-light font-bold uppercase headerTitle">
            CAIROS IOT
        </Link>
        <div className="py-2 relative text-left">
            <button onClick={() => setIsDropdownOpen(true)} type="button" className="flex items-center gap-x-1 text-light">
                <div className="w-20 overflow-hidden md:w-56 headerTitle">{userDetails.email}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {
                isDropdownOpen &&
                <button tabIndex="-1" onClick={() => setIsDropdownOpen(false)} className="fixed inset-0 h-full w-full cursor-default bg-red-500" />
            }
            {
                isDropdownOpen &&
                <div className="z-10 absolute right-0 shadow-lg bg-white">
                    <a tabIndex="1" className="block p-4 text-gray-700 text-sm cursor-pointer">Account&nbsp;settings</a>
                    <a tabIndex="2" className="block p-4 text-gray-700 text-sm cursor-pointer">Support</a>
                    <a onClick={() => handleLogout()} tabIndex="3" className="block p-4 text-gray-700 text-sm cursor-pointer">Logout</a>
                </div>
            }
        </div>
    </div>
    );
  
}

Header.defaultProps = {
};

Header.propTypes = {
};

export default Header;