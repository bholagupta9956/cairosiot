// Demo Projects.jsx demo ;

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
import RedMarker from "../../images/icons/redMarker.png";
// import ParameterCard from '../components/standard/ParameterCard.jsx';
// import GuageChartV3 from '../components/standard/GuageChartV3.jsx';
// import DoughnoutChart from '../components/standard/DoughnoutChart.jsx';
import { searchFilter } from "../../helpers/utils";
import { getIsSuperAdmin } from "../../helpers/auth";
import "../../styles/projects.css";
import { Colors } from "../components/standard/Color.jsx";
import axios from "axios";
import { ja } from "date-fns/locale";
import { $ } from "react-jquery-plugin";

const Projects2 = (props) => {
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
  const [alertData, setAlertData] = useState([]);

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

  // here we are filtering the alert part ;


  useEffect(() =>{
    const url = "https://xstore.skyviewads.com/SalesDepartment/PriceList/GetAll";

    const authToken = localStorage.getItem("authToken")

    const formData = new FormData();
    formData.append("User_Authorization" , authToken);

    axios.post(url , formData )
    .then((res) =>{
      console.log(res , "this is the response")
    })
    .catch((err) =>{
      console.log(err ,"this is the error here")
    })
  })


  useEffect(() => {
    var ddd = [];
    var previousVal;
    for (var i = 0; i < alerts.length - 1; i++) {
      if (i === 0) {
        ddd.push(alerts[i]);
      } else {
        var firstTime = new Date(alerts[i].timestamp);
        var secondTime = new Date(alerts[i - 1].timestamp);
        var diff = (firstTime - secondTime) / 1000;
        diff /= 60;
        const time = Math.abs(Math.round(diff));

        if (time > 9) {
          const alertDat = alerts[i];
          ddd.push(alertDat);
        }
      }
    }
    setAlertData(ddd);
  }, [alerts]);

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

  return (
    <DashboardLayout>
      <div className="projCont">
        <div className="projLeft">
          <div className="projEff">
            <ParameterCard
              type="doughnut_chart"
              name="Efficiency"
              value={efficiency}
              maxValue="100"
              unit="%"
            />
          </div>
          <div className="projAlerts">
            <div className="col-span-2 row-span-5">
              <div className="w-full h-full px-4  rounded-lg overflow-y-scroll">
                <div className="sticky top-0 py-4  text-subHeading text-dark font-bold">
                  Alerts and Warnings
                </div>
                <div className="">
                  {isEmpty(alerts) && (
                    <div className="p-4 bg-green-500 text-white">
                      No alerts reported
                    </div>
                  )}
                  {map(alertData, (alert) => {
                    const modeId = alert.modeId;
                    const deviceId = alert.deviceId;

                    const deviceDetails = devicesById[deviceId];
                    const modeDetails = deviceDetails.latestDataByModeId;

                    const mode = modeDetails.filter((itm) => {
                      return itm.modeId == modeId;
                    });

                    const modeName = mode[0].modeName;

                    console.log(alert , "alerts here")

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
                        modeName={modeName}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="projRight">
          <div className="projHeadCrd">
            <div className="prHeadCrdBox">
              <ParameterCard name="Locations" value={numberOfProjects} />
            </div>
            <div className="prHeadCrdBox">
              <ParameterCard name="Total Equipments" value={numberOfDevices} />
            </div>
            <div className="prHeadCrdBox">
              <ParameterCard name="Alerts" value={numberOfAlerts} />
            </div>
            <div className="prHeadCrdBox">
              <ParameterCard name="Warnings" value={numberOfWarnings} />
            </div>
          </div>

          <div className="projRightRow">
            <div className="ProjRightcol1">
              <div className="col-span-4 row-span-6 dashRight">
                <div className="dashCont">
                  <div className="w-full h-full px-4  rounded-lg overflow-y-scroll equimentList">
                    <div className="sticky top-0 py-4  ">
                      <div className="text-subHeading text-dark font-bold">
                        Equipment List
                      </div>
                      <div
                        className="mt-2 flex items-center gap-x-2"
                        style={{ backgroundColor: Colors.bgColor }}
                      >
                        <select
                          value={projectsView}
                          className="block p-3 bg-background rounded outline-none"
                          onChange={(e) => setProjectsView(e.target.value)}
                          style={{
                            backgroundColor: Colors.bgColor,
                            border: Colors.boxBorder,
                          }}
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
                          style={{
                            backgroundColor: Colors.bgColor,
                            border: Colors.boxBorder,
                            padding: "10px",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {projectsView == "map" && (
                    <Maps height="400px" width="100%" defaultZoom={4}>
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
                          <>
                            <div
                              className="stackedListItm"
                              style={{ backgroundColor: Colors.bgColor }}
                            >
                              <StackedListItem
                                key={project.projectId}
                                {...project}
                                onClick={() =>
                                  handleViewProject(project.projectId)
                                }
                              >
                                <StackedListParam
                                  name="Number of Equipments"
                                  value={project?.devices?.length || 0}
                                  borderRight="var(--boxBorder)"
                                />
                                <StackedListParam
                                  name="Alerts"
                                  value={project?.alertDevice?.length || 0}
                                />
                              </StackedListItem>
                            </div>
                          </>
                        );
                      })}
                    </StackedListContainer>
                  )}
                </div>
              </div>
            </div>
            <div className="ProjRightcol2">
              <div className="col-span-2 row-span-6 ragReport">
                <div className="p-4 w-full h-full  rounded-lg overflow-y-scroll">
                  <div className="text-subHeading text-dark font-bold">
                    RAG Report
                  </div>
                  <select
                    value={drpListVal}
                    onChange={(e) => setDrpListVal(e.target.value)}
                    className="mt-2 block p-3 bg-background rounded outline-none"
                    style={{
                      background: Colors.bgColor,
                      border: Colors.boxBorder,
                    }}
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
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects2;

// http://localhost:8080/#/SIFJB/device/x8pXb/history;
