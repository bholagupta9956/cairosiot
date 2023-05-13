// here we are going to prepare Project Dashboard ;

import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  NavLink,
  useLocation,
  useParams,
  useHistory,
  generatePath,
  useRouteMatch,
} from "react-router-dom";
import { filter, times, size } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  fetchDevicesDetailsUniversal,
  fetchDevicesDetailsRealTime,
} from "../../slices/devicesSlice.js";
import {
  fetchProjectsDetails,
  fetchProjectDetailsRealTime,
} from "../../slices/projectsSlice.js";
import { getAlertsByProject } from "../../slices/alertsSlice.js";
import { RagReportTable } from "../components/standard/RagReportTable.jsx";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import DevicesList from "../components/project-dashboard/DevicesList.jsx";
import Settings from "../components/project-dashboard/Settings.jsx";
import Card from "../components/standard/Card.jsx";
import ParameterInfo from "../components/standard/ParameterInfo.jsx";
import ParameterCard from "../components/dynamic/ParameterCard.jsx";
import { getIsSuperAdmin } from "../../helpers/auth";
import dayjs from "../../helpers/dayjs";
import BackArrow from "../../images/icons/arrow.png";
import "../../styles/projectDashboard.css";


const ProjectDashboard2 = (props) => {

  const { userDetails } = props;
  const { search } = useLocation();
  const { path } = useRouteMatch();
  const searchParams = new URLSearchParams(search);
  const [drpListVal, setDrpListVal] = useState("0");
  const { projectId } = useParams();
  const history = useHistory();
  const [alertsFilter, setAlertsFilter] = useState(
    searchParams.get("filterAlerts")
  );

  
  const {
    isLoading,
    devices: devicesById,
    devicesByProjectId,
  } = useSelector((state) => state.devicesDetails);

  const { isLoading: isProjectsLoading, projects: projectsById } = useSelector(
    (state) => state.projects
  );

  const { isLoading: isAlertsLoading, alertsByProjectId } = useSelector(
    (state) => state.alerts
  );

  const reloadTime = useSelector((state) => state.settings.reloadTime);
  const devices = devicesByProjectId[projectId]; // filter(allDevices, { projectId })

  const dispatch = useDispatch();


  useEffect(() => {

    const companyId = userDetails.companyId;
    const latestEndTime = dayjs();
    const latestStartTime = latestEndTime.subtract(24, "h");
    const end_time = latestEndTime.format("YYYY-MM-DDTHH:mm:ss");
    const start_time = latestStartTime.format("YYYY-MM-DDTHH:mm:ss");

    dispatch(fetchProjectsDetails(companyId));
    dispatch(fetchDevicesDetailsUniversal({ projectId }));
    dispatch(getAlertsByProject(projectId, start_time, end_time));
    
  }, []);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      dispatch(fetchDevicesDetailsRealTime(projectId));
      dispatch(fetchProjectDetailsRealTime(projectId));
    }, reloadTime);

    return () => clearInterval(intervalTimer);
    
  }, [reloadTime]);

  if (isLoading || isProjectsLoading || isAlertsLoading) {
    return (
      <DashboardLayout>
        <div className="my-4 grid gap-4 grid-cols-2 xl:grid-cols-4">
          {times(4, (index) => (
            <Card key={index}>
              <div className="text-center">
                <div className="text-heading text-dark font-bold">
                  {" "}
                  <Skeleton />{" "}
                </div>
                <div className="text-cardHeading text-dark font-medium">
                  {" "}
                  <Skeleton />{" "}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Skeleton height="50vh" />
        <div className="my-4">
          <Skeleton height="5vh" />
          <Skeleton height="20vh" />
          <Skeleton height="20vh" />
        </div>
      </DashboardLayout>
    );
  }

  const projectDetails = projectsById[projectId];
  const alerts = alertsByProjectId[projectId] || [];

  const handleViewDetails = (device) => {
    const path = generatePath("/:projectId/device/:deviceId", {
      projectId,
      deviceId: device.deviceId,
    });
    history.push(path);
  };

  const handleAddCustomDevice = (e) => {
    e.preventDefault();
    const path = generatePath("/:projectId/addDeviceWizard", { projectId });
    history.push(path);
  };

  const handleFilter = (value) => {
    if (value == "alerts") {
      setAlertsFilter("1");
    } else {
      setAlertsFilter(null);
    }
  };

  const filteredDevices = filter(devices, (device) => {
    return alertsFilter && device?.meta?.isAlert;
  });

  const displayDevices = devices; // isEmpty(filteredDevices) ? devices : filteredDevices;

  const numberOfAlerts = size(filter(alerts, { isWarning: false }));
  const numberOfWarnings = size(filter(alerts, { isWarning: true }));


  return (
    <DashboardLayout>
      <div className="projDash">
        <div className="p-4  rounded-lg flex items-center projDashHead">
          <img
            src={BackArrow}
            alt=""
            className="backArrow"
            onClick={() => history.push("/")}
          />
          <div className="text-subHeading text-dark font-bold titless">
            {projectDetails.name}
          </div>
        </div>

        {/* second row */}

        <div className="col-span-6 row-span-1 projDashRow2">
          <div className="flex gap-x-4 h-full projDashRow2Col">
            <div className="projDashHead1">
              <ParameterCard
                type="inline_doughnut_chart"
                name="Efficiency"
                value="100"
                maxValue="100"
                unit="%"
                bgColor="#9ff178"
              />
            </div>
            <div className="projDashHead2">
              <div className="prHeadCrdBox">
                <ParameterCard
                  name="Number of Equipments"
                  value={size(devices)}
                  bgColor="rgb(243 214 188)"
                />
              </div>
              <div className="prHeadCrdBox">
                <ParameterCard
                  name="Active Equipments"
                  value={size(devices)}
                  bgColor="rgb(216 192 235)"
                />
              </div>
              <div className="prHeadCrdBox">
                <ParameterCard
                  name="Alerts"
                  value={numberOfAlerts}
                  bgColor="#b9f0ed"
                />
              </div>
              <div className="prHeadCrdBox">
                <ParameterCard
                  name="Warnings"
                  value={numberOfWarnings}
                  bgColor="#f5dcf0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* third row */}
        <div className="col-span-8 row-span-1 py-4 projDashRow3">
          <div>
            <NavLink
              exact
              to={`/${projectId}`}
              activeClassName="active-link"
              className="p-4 bg-light text-primary cursor-pointer"
            >
              Equipment List
            </NavLink>
            <NavLink
              to={`/${projectId}/settings`}
              activeClassName="active-link"
              className="p-4 bg-light text-primary cursor-pointer"
            >
              Settings
            </NavLink>

            {/* <NavLink
              to={`/${projectId}/RagReportTable`}
              activeClassName="active-link"
              className="p-4 bg-light text-primary cursor-pointer"
            > 
              Rag Report
            </NavLink> */}

          </div>
        </div>

        {/* fourth row */}
        <div className="projDashRow4">
          <div className="col-span-8 ">
            <Switch>
              <Route exact path={path}>
                <DevicesList
                  devices={devices}
                  devicesById={devicesById}
                  projectDetails={projectDetails}
                  alerts={alerts}
                  onViewDeviceDetails={handleViewDetails}
                  onAddCustomDevice={handleAddCustomDevice}
                />
              </Route>
              <Route path={`${path}/settings`}>
                <Settings />
              </Route>

              {/* <Route path={`${path}/RagReportTable`}> */}
              {/* <RagReportTable /> */}
              {/* <div className="col-span-2 row-span-6">
                <div className="w-full h-full py-4 bg-light rounded-lg overflow-y-scroll">
                  <Card>
                    <p
                      style={{
                        paddingLeft: 10,
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      RAG Report
                    </p>
                    <select
                      value={drpListVal}
                      onChange={(e) => setDrpListVal(e.target.value)}
                      //value={projectsView}
                      className="block px-3 py-2 bg-background rounded outline-none"
                      //onChange={e => setProjectsView(e.target.value)}
                    >
                      <option value="-1">Past DUe</option>
                      <option value="0">Due Today</option>
                      <option value="7">Due in 7 Days</option>
                      <option value="15">Due in 15 Days</option>
                    </select> */}
              {/* <h1>DRPVAL:- {drpListVal}</h1> */}
              {/* <RagReportTable
                      devicesById={devices}
                      drpListVal={drpListVal}
                      projects={projectsById}
                    /> */}
              {/* </Card> */}
              {/* </div> */}
              {/* </div> */}
              {/* </Route> */}

            </Switch>
          </div>
        </div>
      </div>
    </DashboardLayout>

  );
};

export default ProjectDashboard2;
