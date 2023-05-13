import React, { useEffect, useState } from "react";
import {
    NavLink 
} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import className from 'classnames';
import "../../../styles/sideBarV2.css";
import { useSelector, useDispatch } from 'react-redux'

import { map, size, reduce, values, isEmpty } from 'lodash';
import {
    useHistory,
    useParams,
    generatePath 
  } from 'react-router-dom';
import { getIsSuperAdmin } from "../../../helpers/auth"


const SidebarV2 = props => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const [showDeviceList,setshowDeviceList] = useState(false);
    const [showProjectList,setshowProjectList] = useState(false);
    const [showAddNew,setShowAddNew] = useState(false);


    const dispatch = useDispatch()
    const history = useHistory();

    const { projects } = useSelector((state) => state.projects)
    const { isLoading, devicesByProjectId } = useSelector((state) => state.devicesDetails)
    const { isLoading: isUserLoading, details: userDetails } = useSelector((state) => state.currentUser);

    const { projectId } = useParams();

    const isSuperAdmin = getIsSuperAdmin(userDetails)
    const devices = devicesByProjectId[projectId] || []

    if (isCollapsed) {
        return (
            <div
                className="z-30 min-h-screen bg-gray-900 w-16 text-white shadow-lg gap-y-2 sideBarV2Cont"
                onMouseEnter={() => setIsCollapsed(false)}
            >
                <button
                    className="h-14 w-full flex items-center justify-center"
                    onClick={() => setIsCollapsed(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* Dashboard */}
                <div  className="h-14 w-full flex items-center justify-center sideBarV2box">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                </div>
                {/* Locations */}
                <div className="h-14 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                {/* Equipment */}
                {
                    !isEmpty(devices) &&
                    <div className="h-14 w-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                }
                {/* Users */}
                <div className="h-14 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                </div>
                <div className="h-14 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div className="h-14 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="h-14 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div
            onMouseLeave={() => setIsCollapsed(true)}
            className="z-30 bg-gray-900 w-64 min-w-fit text-white shadow-lg sideBarV2Cont"
            style={{ minHeight: 'calc(100vh - 50px)' }}
        >
            <button
                onClick={() => setIsCollapsed(true)}
                className="h-14 w-full flex gap-2 items-center px-6"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="">
                    Menu
                </div>
            </button>
            <NavLink to="/"  className="h-14 w-full flex gap-2 items-center px-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <div className="ml-2">
                    Dashboard
                </div>
            </NavLink >
            <NavLink to="/config"  className="h-14 w-full flex gap-2 items-center px-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <div className="ml-2">
                    Config
                </div>
            </NavLink >
            <div className="h-14 w-full flex gap-2 items-center px-6" onClick={()=>setshowProjectList(!showProjectList)}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="ml-2" >
                    Locations
                </div>
            </div>
            {
                showProjectList &&
                <ul>
                    {
                        map(projects, project => (
                            <NavLink to={`/${project.projectId}`} key={project.projectId} className="sidebar-menu-item cursor-pointer ml-10">{project.name}</NavLink>
                        ))
                    }
                </ul>
            }

            {
                !isEmpty(devices) &&
                (
                    <div  className="h-14 w-full flex gap-2 items-center px-6" onClick={()=>{setshowDeviceList(!showDeviceList)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <div className="ml-2" >
                            Equipments
                        </div>
                    </div>
                )
            }

            {
                showDeviceList &&
                (
                    map(devices, device => (
                        <NavLink key={device.deviceId} to={`/${device.projectId}/device/${device.deviceId}`} className="sidebar-menu-item cursor-pointer ml-10">{device.name}</NavLink>
                    ))
                )
            }
            {
                isSuperAdmin && (
                    <NavLink to="/users"  className="h-14 w-full flex gap-2 items-center px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <div className="ml-2">
                            Users & Roles
                        </div>
                    </NavLink>
                )
            }
            {
                isSuperAdmin && (
                    <NavLink to="/companies"  className="h-14 w-full flex gap-2 items-center px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div className="ml-2">
                            Companies
                        </div>
                    </NavLink>
                )
            }
            <div className="h-14 w-full flex gap-2 items-center px-6" onClick={()=> setShowAddNew(!showAddNew)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-2">
                    Add New
                </div>
            </div>
            {
                showAddNew && (
                    <ul className="ml-4">
                        { isSuperAdmin && <NavLink to="/addCompany" className="h-14 w-full flex gap-2 items-center px-6">Company</NavLink> }
                        <NavLink to="/addProject" className="sidebar-menu-item cursor-pointer">Location</NavLink>
                    </ul>
                )
            }
            <NavLink to="/settings"  className="h-14 w-full flex gap-2 items-center px-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-2">
                    Settings
                </div>
            </NavLink >
        </div>
    );
}

SidebarV2.defaultProps = {
};

SidebarV2.propTypes = {
};

export default SidebarV2;