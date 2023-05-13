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


const ProjectDashboard = (props) => {
  const { userDetails } = props;
  const { search } = useLocation();
  const { path } = useRouteMatch();
  const searchParams = new URLSearchParams(search);
  const [ drpListVal, setDrpListVal ] = useState("0");

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
      <div className="my-4 grid gap-4 grid-cols-4 md:grid-cols-8">
        <div className="col-span-4 md:col-span-8">
          <div className="p-4 bg-light rounded-lg flex items-center">
            <div className="text-subHeading text-dark font-bold">
              {projectDetails.name}
            </div>
          </div>
        </div>

        <div className="col-span-4 md:col-span-2">
          <ParameterCard
            type="inline_doughnut_chart"
            name="Efficiency"
            value="100"
            maxValue="100"
            unit="%"
          />
        </div>
  
        <div className="col-span-4 md:col-span-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
            <ParameterCard name="Number of Equipments" value={size(devices)} />
            <ParameterCard name="Active Equipments" value={size(devices)} />
            <ParameterCard name="Alerts" value={numberOfAlerts} />
            <ParameterCard name="Warnings" value={numberOfWarnings} />
          </div>
        </div>

        <div className="col-span-4 md:col-span-8">
          <div className="py-4">
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
          </div>
        </div>

        <div className="col-span-4 md:col-span-8">
          <Switch>
            <Route exact path={path}>
              <DevicesList
                devices={devices}
                devicesById={devicesById}
                alerts={alerts}
                onViewDeviceDetails={handleViewDetails}
                onAddCustomDevice={handleAddCustomDevice}
              />
            </Route>
            <Route path={`${path}/settings`}>
              <Settings />
            </Route>
          </Switch>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDashboard;
