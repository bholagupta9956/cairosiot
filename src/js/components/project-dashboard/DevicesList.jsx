import React, { useState , useEffect } from "react";
import { map, values, isEmpty } from "lodash";
import { StackedListContainer } from "../standard/StackedList.jsx";
import Maps, { Marker } from "../standard/Map.jsx";
import Button from "../standard/Button.jsx";
import Input from "../standard/Input.jsx";
import Alert from "../standard/Alert.jsx";
import StackedListItem from "../dynamic/StackedListItem.jsx";
import { searchFilter } from "../../../helpers/utils";
import Card from "../standard/Card.jsx";
import "./project-dashboard.css";
import { Colors } from "../standard/Color.jsx";
import RedMarker from "../../../images/icons/redMarker.png";
import GreenMarker from "../../../images/icons/greenMarker.png";
import YellowMarker from "../../../images/icons/yellowMarker.png";
import { ja } from "date-fns/locale";



const DevicesList = (props) => {

  const {
    devices,
    devicesById,
    alerts,
    onViewDeviceDetails,
    onAddCustomDevice,
    projectDetails,
  } = props;

  const [searchQuery, setSearchQuery] = useState();
  const [searchQuery2, setSearchQuery2] = useState();
  const [devicesView, setDevicesView] = useState("table");
  const [deviceData, setDeviceData] = useState(devices);
  const [alertData ,setAlertData] = useState([]);
  
  const handleSearchQuery = (e) => {
    
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (value === "point_machine") {
      setSearchQuery2("forward");
      const filterData = devices.filter((itm, index) => {
        return (
          itm.name.toLowerCase().includes("forward") ||
          itm?.deviceType.toLowerCase().includes("forward") ||
          itm?.prametersByModeId?.modeValue.toLowerCase().includes("forward") ||
          itm?.prametersByModeId?.modeName.toLowerCase().includes("forward") ||
          itm.name.toLowerCase().includes("reverse") ||
          itm?.deviceType.toLowerCase().includes("reverse") ||
          itm?.prametersByModeId?.modeValue.toLowerCase().includes("reverse") ||
          itm?.prametersByModeId?.modeName.toLowerCase().includes("reverse")
        );
      });
      setDeviceData(filterData);
    } else {
      
      setSearchQuery2(value);
      const filterData = devices.filter((itm, index) => {
        return (
          itm.name.toLowerCase().includes(value) ||
          itm?.deviceType.toLowerCase().includes(value) ||
          itm?.prametersByModeId?.modeValue.toLowerCase().includes(value) ||
          itm?.prametersByModeId?.modeName.toLowerCase().includes(value)
        );
      });
      setDeviceData(filterData);
    }

    if (value === "") {
      setDeviceData(devices);
    }
  };

  // const displayDevices = devices; // isEmpty(filteredDevices) ? devices : filteredDevices;

  const results = searchFilter(
    values(devices),
    [
      "name",
      "deviceType",
      "prametersByModeId.modeValue",
      "prametersByModeId.modeName",
    ],
    searchQuery2
  );

  // debugger;


   // here we are filtering the alert part ;

   useEffect( () => {
    var ddd = [];
    var previousVal ;
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

  return (
    <div className="grid gap-x-4 grid-cols-8 devListCont">
      <div className="col-span-2 row-span-4 devListContCol1">
        <div className="w-full px-4 bg-light rounded-lg overflow-y-scroll alertCont">
          <div className="sticky top-0 py-4  text-subHeading text-dark font-bold alertMinCont">
            Alerts and Warnings
          </div>
          <div className="alertDta">
            {isEmpty(alerts) && (
              <div className="p-4  text-white alertMsg">No alerts reported</div>
            )}
            {map(alertData, (alert) => {
              const deviceId = alert.deviceId ;
              const modeId = alert.modeId ;

              console.log(alert ,"alert here");
              const filterData = devices.filter((itm,index) =>{
                return itm.deviceId === deviceId
              })

              const deviceDta = filterData[0]?.latestDataByModeId.filter((itm,ind) =>{
                return itm.modeId === modeId
              })

              const modeName =  deviceDta[0].modeName;
             
              return (
                <Alert
                  key={`${alert.deviceId}-${alert.timestamp}`}
                  isWarning={alert.isWarning}
                  deviceId={alert.deviceId}
                  device={devicesById[alert.deviceId]?.name}
                  parameters={alert.parameters}
                  timestamp={alert.timestamp}
                  devicesById={devicesById}
                  projectId={projectDetails.projectId}
                  modeName={modeName}
                  
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-6 devListContCol2">
        <div className="w-full h-full p-4  rounded-lg overflow-y-scroll">
          <div className="flex gap-4 equiBtn">
            <select
              value={devicesView}
              className="block px-3 py-2 bg-background rounded outline-none"
              onChange={(e) => setDevicesView(e.target.value)}
              style={{
                backgroundColor: Colors.bgColor,
                border: Colors.boxBorder,
              }}
            >
              <option value="map">Map</option>
              <option value="table">Table</option>
            </select>
            <Button
              isFullWidth={false}
              label="+&nbsp;Add&nbsp;New&nbsp;Custom&nbsp;Equipment"
              type="button"
              onClick={onAddCustomDevice}
            />
          </div>

          {devicesView == "map" && (
            <Maps
              defaultZoom={8}
              width="100%"
              height="400px"
              center={[
                parseInt(projectDetails.lat),
                parseInt(projectDetails.lng),
              ]}
              // style={{ minHeight: 800 }}
            >
              {map(results, (device) => {
                
                var alert = false;
                var warning = false;
                var normal = false;

                device?.latestDataByModeId.map((itm) => {
                  if (itm.isAlert) {
                    alert = true;
                  } else if (itm.isWarning) {
                    warning = true;
                  } else {
                    normal = true;
                  }
                });

                return (
                  <div
                    key={device.deviceId}
                    onClick={() => handleDeviceClick(device)}
                    lat={device.lat}
                    lng={device.lng}
                  >
                    {alert && (
                      <img
                        src={RedMarker}
                        alt="marker icons"
                        style={{ width: "35px", height: "35px" }}
                        resizeMode="contian"
                      />
                    )}

                    {warning && (
                      <img
                        src={YellowMarker}
                        alt="marker icons"
                        style={{ width: "35px", height: "35px" }}
                        resizeMode="contian"
                      />
                    )}

                    {normal && (
                      <img
                        src={GreenMarker}
                        alt="marker icons"
                        style={{ width: "35px", height: "35px" }}
                        resizeMode="contian"
                      />
                    )}
                  </div>
                );
              })}
            </Maps>
          )}
          {devicesView == "table" && (
            <StackedListContainer heading="Equipments List">
              <div
                className="p-2 border-b flex gap-x-2 items-center"
                style={{
                  backgroundColor: Colors.bgColor,
                  border: Colors.boxBorder,
                }}
              >
                <Input
                  isFullWidth={false}
                  placeholder="Search ..."
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQuery}
                  style={{
                    backgroundColor: Colors.bgColor,
                    border: Colors.boxBorder,
                    borderRadius: "4px",
                  }}
                />
                <select
                  value={searchQuery}
                  className="block px-3 py-2.5 bg-background rounded outline-none"
                  onChange={handleSearchQuery}
                  style={{
                    backgroundColor: Colors.bgColor,
                    border: Colors.boxBorder,
                  }}
                >
                  <option value="">All</option>
                  <option value="point_machine">Point Machine</option>
                  <option value="dc_track">DC Track</option>
                  <option value="signal">Signal</option>
                </select>
              </div>
              <div className="equiContt">
                {isEmpty(devices) && (
                  <div className="p-4 border-1">
                    This project dosent not have any devices.
                  </div>
                )}
                {map(results, (device, id) => {
                  const { latestDataByModeId } = device;
                  return (
                    <div className="stackListCont stackLssst">
                      <StackedListItem
                        key={device.deviceId}
                        id={device.deviceId}
                        type={device.deviceType}
                        name={device.name}
                        latestData={latestDataByModeId}
                        isAlert={device?.isAlert}
                        onClick={() => onViewDeviceDetails(device)}
                      />
                    </div>
                  );
                })}
              </div>
            </StackedListContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevicesList;
