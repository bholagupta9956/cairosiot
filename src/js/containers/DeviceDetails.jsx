import React, { useEffect } from "react";
import { sumBy, size, filter } from 'lodash';
import dayjs from '../../helpers/dayjs'
import {
  Switch,
  Route,
  NavLink,
  generatePath,
  useParams,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDeviceEvents } from '../../slices/deviceEventsSlice';
import {
  fetchDevicesDetails,
  fetchDeviceDetailsRealTime,
  deprecateDevice,
  deleteDevice
} from '../../slices/devicesSlice.js';
import { getAlertsByDevice } from '../../slices/alertsSlice.js';
import { fetchProjectsDetails } from '../../slices/projectsSlice.js';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import LiveUpdates from '../components/device-details/LiveUpdates.jsx'
import EventsHistory from '../components/device-details/EventsHistory.jsx'
import AlertsHistory from '../components/device-details/AlertsHistory.jsx'
import Settings from '../components/device-details/Settings.jsx'
import ParameterInfo from '../components/standard/ParameterInfo.jsx';
import ParameterCard from "../components/dynamic/ParameterCard.jsx";
import { getIsSuperAdmin } from '../../helpers/auth';
import BackArrow from "../../images/icons/arrow.png";
import { Colors } from "../components/standard/Color.jsx";
import axios from "axios";



const DeviceDetails = props => {

  const { userDetails } = props;
  const { projectId, deviceId } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { devices, isLoading } = useSelector((state) => state.devicesDetails);
  const { events: deviceEvents, isLoading: isEventsLoading } = useSelector((state) => state.deviceEvents);
  const { isLoading: isAlertsLoading, alertsByDeviceId } = useSelector((state) => state.alerts);
  const reloadTime = useSelector((state) => state.settings.reloadTime);

  useEffect(() => {

    const companyId = userDetails.companyId
    const latestEndTime = dayjs()
    const latestStartTime = latestEndTime.subtract(24, 'h')
  
    const end_time = latestEndTime.format("YYYY-MM-DDTHH:mm:ss")
    const start_time = latestStartTime.format("YYYY-MM-DDTHH:mm:ss")
  
    dispatch(fetchProjectsDetails(companyId))
    dispatch(getAlertsByDevice(deviceId, start_time, end_time))
    dispatch(fetchDeviceEvents(projectId, deviceId, start_time, end_time))
    dispatch(fetchDevicesDetails(projectId))
    
  }, []);

  
  // useEffect(() => {
  //   const intervalTimer = setInterval(() => dispatch(fetchDeviceDetailsRealTime(projectId, deviceId)), reloadTime)

  //   return () => clearInterval(intervalTimer)
  // }, [reloadTime])

  // useEffect(() => {
  //   if (deviceDetails && !isEmpty(deviceDetails.latestDataByModeId)) {
  //     const endTime = first(deviceDetails.latestDataByModeId).timestamp;
  //     const startTime = formatToInvenseTime(sub(parseInvenseTime(endTime), { hours: 1 }));

  //     setStartTime(startTime);
  //     setEndTime(endTime);
      
  //     dispatch(fetchDeviceEventsRealTime(projectId, deviceId, startTime, endTime));
  //   }
  // }, [deviceDetails]);
  

  const deviceDetails = devices[deviceId];

  console.log(devices , "devices here");

  if (isLoading) {
    return "Loading...!!!";
  }

  const handleTimeFrameChange = (startTime, endTime) => {
    startTime = dayjs(startTime).format("YYYY-MM-DD[T]HH:mm:ss[Z]") // formatToInvenseTime(startTime)
    endTime = dayjs(endTime).format("YYYY-MM-DD[T]HH:mm:ss[Z]") //formatToInvenseTime(endTime)
    dispatch(fetchDeviceEvents(projectId, deviceId, startTime, endTime))
  }

  const handleDepricateDevice = (e) => {
    e.preventDefault()
    dispatch(deprecateDevice(projectId, deviceId))
    const path = generatePath("/:projectId", { projectId })
    history.push(path)
  };

  const handleDeleteDevice = (e) => {
    e.preventDefault()
    if (!confirm("Are you sure? This action is not reversible")) {
      return
    }

    dispatch(deleteDevice(projectId, deviceId, () => {
      const path = generatePath("/:projectId", { projectId })
      history.push(path)
    }))
  }

  const getLiveDeviceDetails = () => {
    dispatch(fetchDeviceDetailsRealTime(projectId, deviceId))
  }

  const getAlertsOfDevice = (startTime, endTime) => {
    startTime = dayjs(startTime).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
    endTime = dayjs(endTime).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
    dispatch(getAlertsByDevice(deviceId, startTime, endTime))
  }


  const alerts = alertsByDeviceId[deviceId] || []
  const numberOfParams = sumBy(deviceDetails.prametersByModeId, prametersByModeId => size(prametersByModeId.parameters))
  const numberOfModes = size(deviceDetails.prametersByModeId);

  // const numberOfAlerts = size(alerts)

  const numberOfAlerts = size(filter(alerts, { isWarning: false }));
  const numberOfWarnings = size(filter(alerts, { isWarning: true }));
  // const latestEvent = first(orderBy(deviceDetails.latestDataByModeId, 'timestamp', 'desc'))
  const latestEndTime = dayjs();
  const latestStartTime = latestEndTime.subtract(1, 'h');
  const latestEndTimeStamp = latestEndTime.format("YYYY-MM-DDTHH:mm:ss");
  const latestStartTimeStamp = latestStartTime.format("YYYY-MM-DDTHH:mm:ss");

 

  return (
    
    <DashboardLayout>
      <div className="my-4">
        <div className="my-4 grid gap-4 grid-cols-1">
          <div className="p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center" style={{backgroundColor : Colors.bgColor}}>
            <div className="devHead" style={{backgroundColor : Colors.bgColor}}>
            <img src={BackArrow} alt="" className="backArrow" onClick={() => history.push(`/${projectId}`)}/>
              <div className="text-subHeading text-dark font-bold titless">{deviceDetails.name}</div>
            </div>
          </div>
        </div>

        {/* <div className="grid gap-4 grid-cols-4">
          <ParameterCard
            type="inline_doughnut_chart"
            name="Efficiency"
            value="100"
            maxValue="100"
            unit="%"
          />
          <ParameterCard
            name="Equipment Type"
            value={deviceDetails.deviceType}
          />
          <ParameterCard
            name="Number of alerts"
            value={numberOfAlerts}
          />
          <ParameterCard
            name="Number of warnings"
            value={numberOfWarnings}
          />
        </div> */}

      </div>
      

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        
        <ParameterCard
          type="inline_doughnut_chart"
          name="Efficiency"
          value="100"
          maxValue="100"
          unit="%"
        />

        <ParameterCard
          name="Equipment Type"
          value={deviceDetails.deviceType}
        />

        <ParameterCard
          name="Number of alerts"
          value={numberOfAlerts}
        />

        <ParameterCard
          name="Number of warnings"
          value={numberOfWarnings}
        />

      </div>

      <div className="my-4 grid md:flex rounded">
        <NavLink
          exact
          to={`/${projectId}/device/${deviceId}`}
          activeClassName="active-link"
          className="p-4 bg-light text-primary cursor-pointer"
        > 
          Live&nbsp;Updates
        </NavLink>
        <NavLink
          to={`/${projectId}/device/${deviceId}/history`}
          activeClassName="active-link"
          className="p-4 bg-light text-primary cursor-pointer"
        > 
          Events&nbsp;History
        </NavLink>
        <NavLink
          to={`/${projectId}/device/${deviceId}/alerts`}
          activeClassName="active-link"
          className="p-4 bg-light text-primary cursor-pointer"
        >
          Alerts&nbsp;History
        </NavLink>
        <NavLink
          to={`/${projectId}/device/${deviceId}/settings`}
          activeClassName="active-link"
          className="p-4 bg-light text-primary cursor-pointer"
        >
          Settings
        </NavLink>
      </div>
      <Switch>
        <Route exact path={path}>
          <LiveUpdates
            reloadTime={reloadTime}
            deviceDetails={deviceDetails}
            getLiveDeviceDetails={getLiveDeviceDetails}
          />
        </Route>
        <Route path={`${path}/history`}>
         
           <EventsHistory
             isLoading={isEventsLoading}
             initialTimestamp={{
               startTime: latestStartTimeStamp,
               endTime: latestEndTimeStamp
             }}
             deviceDetails={deviceDetails}
             prametersByModeId={deviceDetails.prametersByModeId}
             deviceEvents={deviceEvents}
             handleTimeFrameChange={handleTimeFrameChange}
             deviceType={deviceDetails.deviceType}
           />  

          
        
        </Route>
        <Route path={`${path}/alerts`}>

          <AlertsHistory
            isAlertsLoading={isAlertsLoading}
            initialTimestamp={{
              startTime: latestStartTimeStamp,
              endTime: latestEndTimeStamp
            }}
            alerts={alerts}
            getAlertsOfDevice={getAlertsOfDevice}
            deviceId={deviceId}
            devices={devices}
          />
        </Route>
        <Route path={`${path}/settings`}>
          <Settings
            deviceDetails={deviceDetails}
            handleDeleteDevice={handleDeleteDevice}
            handleDepricateDevice={handleDepricateDevice}
          />
        </Route>
      </Switch>
    </DashboardLayout>
  );
}

export default DeviceDetails;


