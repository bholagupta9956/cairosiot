// Live updates here ;

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { map, chain } from "lodash";
import ParameterCard from "../standard/ParameterCard.jsx";
import ParameterInfoLineChart from "../standard/ParameterInfoGuageChart.jsx";
import ParameterInfo from "../dynamic/ParameterInfo.jsx";
import Card from "../standard/Card.jsx";
import { Colors } from "../standard/Color.jsx";


dayjs.extend(utc);

const LiveUpdates = (props) => {

  const { deviceDetails, reloadTime, getLiveDeviceDetails } = props;  
  const [currentDateTime , setCurrentDateTime] = useState("00-00-2022 00:00:00")

  const getCurrentDate = () => {
    var date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

  var strDateTime =
      day + "-" + month + "-" + year + " " + hour + ":" + minute 
      setCurrentDateTime(strDateTime)
  };


  useEffect(() => {
   
    const intervalTimer = setInterval(getLiveDeviceDetails, reloadTime);
    return () => clearInterval(intervalTimer);
   
  }, [reloadTime]);

  useEffect(() =>{
    getCurrentDate()
  },[])

  return (
    <>
      {map(deviceDetails.latestDataByModeId, (modeData) => {
        return (
          <div className="my-4 border-t-2">
            {modeData.modeName && (
              <div className="my-4 grid gap-4 grid-cols-6">
                <div
                  className="col-span-3 xl:col-span-2 p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center"
                  style={{
                    backgroundColor: Colors.bgColor,
                    border: Colors.boxBorder,
                    borderRadius: "7px",
                  }}
                >
                  <div className="">
                    <div className="text-cardHeading font-medium">
                      Timestamp
                    </div>
                    <div className="text-cardHeading text-dark font-bold ">
                      {/* {dayjs
                        .utc(modeData.timestamp)
                        .format("HH:mm:ss DD MMM YYYY")} */}
                        {currentDateTime}
                    </div>
                  </div>
                </div>
                <div
                  className="col-span-3 xl:col-span-4 p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center"
                  style={{
                    backgroundColor: Colors.bgColor,
                    border: Colors.boxBorder,
                    borderRadius:"7px",
                    
                  }}
                >
                  <div className="m-auto">
                    <div className="text-cardHeading font-medium ">
                      {modeData.modeName}
                    </div>
                    <div className="text-cardHeading text-dark font-bold">
                      {modeData.modeValue}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-6 xl:grid-cols-6">
              {chain(modeData.parameters)
                .sortBy("type")
                .filter((param)=> param.unit)
                .map((param) => {
                  return (
                    <>
                      <ParameterInfo {...param} />
                    </>
                  );
                })
                .value()}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LiveUpdates;
