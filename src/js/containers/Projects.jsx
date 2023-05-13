import React, { useEffect, useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { map, size, reduce, values, isEmpty, filter } from "lodash";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProjectsDetails,
  fetchProjectsDetailsRealTime,
} from "../../slices/projectsSlice.js";
import { fetchDevicesDetailsUniversal } from "../../slices/devicesSlice.js";
import { getAlerts } from "../../slices/alertsSlice";
import Skeleton from "react-loading-skeleton";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Button from "../components/standard/Button.jsx";
import Maps, { Marker } from "../components/standard/Map.jsx";
import Card from "../components/standard/Card.jsx";
import Input from "../components/standard/Input.jsx";
import {
  StackedListContainer,
  StackedListItem,
  StackedListParam,
} from "../components/standard/StackedList.jsx";
import Alert from "../components/standard/Alert.jsx";
import RagReportTable from "../components/standard/RagReportTable.jsx";
import ParameterCard from "../components/dynamic/ParameterCard.jsx";
// import ParameterCard from '../components/standard/ParameterCard.jsx';
// import GuageChartV3 from '../components/standard/GuageChartV3.jsx';
// import DoughnoutChart from '../components/standard/DoughnoutChart.jsx';
import { searchFilter } from "../../helpers/utils";
import { getIsSuperAdmin } from "../../helpers/auth";
import "../../styles/projects.css";

dayjs.extend(utc);

const Projects = (props) => {
  const { userDetails } = props;
  const [searchQuery, setSearchQuery] = useState();
  const [projectsView, setProjectsView] = useState("table");
  const [drpListVal, setDrpListVal] = useState("0");

  const { isLoading, projects } = useSelector((state) => state.projects);
  const { isLoading: isAlertsLoading, alerts } = useSelector(
    (state) => state.alerts
  );
  const { isLoading: isDevicesLoading, devices: devicesById } = useSelector(
    (state) => state.devicesDetails
  );
  const reloadTime = useSelector((state) => state.settings.reloadTime);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const companyId = userDetails.companyId;
    const latestEndTime = dayjs();
    const latestStartTime = latestEndTime.subtract(24, "h");

    const end_time = latestEndTime.format("YYYY-MM-DDTHH:mm:ss");
    const start_time = latestStartTime.format("YYYY-MM-DDTHH:mm:ss");

    dispatch(fetchProjectsDetails(companyId));
    dispatch(fetchDevicesDetailsUniversal({ companyId }));
    dispatch(getAlerts(companyId, start_time, end_time));
  }, []);

  // console.log("Check:- "+JSON.stringify(devicesById));

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      const companyId = userDetails.companyId;
      dispatch(fetchProjectsDetailsRealTime(companyId));
    }, reloadTime);

    return () => clearInterval(intervalTimer);
  }, [reloadTime]);

  if (isLoading || isAlertsLoading || isDevicesLoading) {
    return (
      <DashboardLayout>
        <Skeleton height="60vh" />
        <div className="my-4">
          <Skeleton height="5vh" />
          <Skeleton height="20vh" />
          <Skeleton height="20vh" />
        </div>
      </DashboardLayout>
    );
  }

  if (isEmpty(projects)) {
    return (
      <DashboardLayout>
        <div className="p-4 border-1">
          You dont have any projects assigned to you. Please contact your admin.
        </div>
      </DashboardLayout>
    );
  }

  const numberOfProjects = size(projects);
  const numberOfDevices = reduce(
    projects,
    (sum, project) => sum + size(project.devices),
    0
  );
  const numberOfAlerts = size(filter(alerts, { isWarning: false }));
  const numberOfWarnings = size(filter(alerts, { isWarning: true }));
  const activeDevices = numberOfDevices - numberOfAlerts;
  const efficiency = ((numberOfDevices / numberOfDevices) * 100).toFixed(2);

  const handleViewProject = (projectId) => {
    const path = generatePath("/:projectId", { projectId });
    history.push(path);
  };

  const handleViewAlerts = (projectId) => {
    const path = generatePath("/:projectId/?filterAlerts=1", { projectId });
    history.push(path);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const path = generatePath("/addProject");
    history.push(path);
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);
  };

  const results = searchFilter(values(projects), ["name"], searchQuery);
  const isSuperAdmin = getIsSuperAdmin(userDetails);

  const containerStyle = !isTabletOrMobile ? { "height": "calc(100vh - 200px)"} : {};

  return (
    <DashboardLayout>
      <div
        className="my-4 grid gap-4 grid-cols-8 grid-rows-6"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="col-span-2 row-span-2">
          <ParameterCard
            type="inline_doughnut_chart"
            name="Efficiency"
            value="100"
            maxValue="100"
            unit="%"
          />
        </div>
        <div className="col-span-6 row-span-1">
          <div className="flex gap-x-4 h-full">
            <ParameterCard name="Locations" value={numberOfProjects} />
            <ParameterCard name="Total Equipments" value={numberOfDevices} />
            <ParameterCard name="Alerts" value={numberOfAlerts} />
            <ParameterCard name="Warnings" value={numberOfWarnings} />
          </div>
        </div>

        <div className="col-span-4 row-span-6 dashRight">
          <div className="dashCont">
            <div className="w-full h-full px-4 bg-light rounded-lg overflow-y-scroll equimentList">
              <div className="sticky top-0 py-4 bg-light ">
                <div className="text-subHeading text-dark font-bold">
                  Equipment List
                </div>
                <div className="mt-2 flex items-center gap-x-2">
                  <select
                    value={projectsView}
                    className="block p-3 bg-background rounded outline-none"
                    onChange={(e) => setProjectsView(e.target.value)}
                  >
                    <option value="map">Map</option>
                    <option value="table">Table</option>
                  </select>
                  <Input
                    isFullWidth={false}
                    placeholder="Search ..."
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQuery}
                  />
                </div>
              </div>
            </div>

            {projectsView == "map" && (
              <Maps height="100%">
                {map(projects, (project, id) => (
                  <Marker
                    key={id}
                    lat={project.lat}
                    lng={project.lng}
                    name={project.name}
                    onClick={() => handleViewProject(project.projectId)}
                  />
                ))}
              </Maps>
            )}

            {projectsView == "table" && (
              <StackedListContainer>
                {map(results, (project) => {
                  return (
                    <StackedListItem
                      key={project.projectId}
                      {...project}
                      onClick={() => handleViewProject(project.projectId)}
                    >
                      <StackedListParam
                        name="Number of Equipments"
                        value={project?.devices?.length || 0}
                      />
                      <StackedListParam
                        name="Alerts"
                        value={project?.alertDevice?.length || 0}
                      />
                    </StackedListItem>
                  );
                })}
              </StackedListContainer>
            )}
          </div>

          {/* <div className="w-full h-full px-4 bg-light rounded-lg overflow-y-scroll">
            
            
          </div> */}
        </div>

        <div className="col-span-2 row-span-6 ragReport">
          <div className="p-4 w-full h-full bg-light rounded-lg overflow-y-scroll">
            <div className="text-subHeading text-dark font-bold">
              RAG Report
            </div>
            <select
              value={drpListVal}
              onChange={(e) => setDrpListVal(e.target.value)}
              className="mt-2 block p-3 bg-background rounded outline-none"
            >
              <option value="-1">Past Due</option>
              <option value="0">Due Today</option>
              <option value="7">Due in 7 Days</option>
              <option value="15">Due in 15 Days</option>
            </select>
            <div className="mt-2 py-2">
              <RagReportTable
                devicesById={devicesById}
                drpListVal={drpListVal}
                projects={projects}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-5">
          <div className="w-full h-full px-4 bg-light rounded-lg overflow-y-scroll">
            <div className="sticky top-0 py-4 bg-light text-subHeading text-dark font-bold">
              Alerts and Warnings
            </div>
            <div className="">
              {isEmpty(alerts) && (
                <div className="p-4 bg-green-500 text-white">
                  No alerts reported
                </div>
              )}
              {map(alerts, (alert) => {
                return (
                  <Alert
                    key={`${alert.deviceId}-${alert.timestamp}`}
                    isWarning={alert.isWarning}
                    deviceId={alert.deviceId}
                    projectId={alert.projectId}
                    device={devicesById[alert.deviceId]?.name}
                    project={projects[alert.projectId]?.name}
                    parameters={alert.parameters}
                    timestamp={alert.timestamp}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
