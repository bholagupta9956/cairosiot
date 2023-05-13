import React, { useEffect, useReducer , useState } from "react";
import { map, isEmpty } from "lodash";
import Alert from "../standard/AlertDetailed.jsx";
import Card from "../standard/Card.jsx";
import Button from "../standard/Button.jsx";
import Input from "../standard/Input.jsx";
import { it } from "date-fns/locale";
import * as dayjs from "dayjs";


function reducer(state, action) {
  
  switch (action.type) {
    case "update-start-time":
      return { ...state, startTime: action.value };

    case "update-end-time":
      return { ...state, endTime: action.value };

    case "submit":
      return { ...state, endTime: action.value };

    default:
      throw new Error();
  }
}


const AlertsHistory = (props) => {

  const {
    isAlertsLoading,
    alerts,
    getAlertsOfDevice,
    initialTimestamp,
    deviceId,
    devices,
  } = props;

  const [state, reducerDispatch] = useReducer(reducer, initialTimestamp);
  const [alertData , setAlertData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getAlertsOfDevice(state.startTime, state.endTime);
  };

  // setting the alert according to the time ;

  
  useEffect( () => {

    var ddd = [];

    for (var i = 0; i < alerts.length - 1; i++) {
      if (i === 0) {
        ddd.push(alerts[i]);
      } else {
        var firstTime = new Date(alerts[i]?.timestamp);
        var secondTime = new Date(alerts[i - 1]?.timestamp);
        var diff = (firstTime - secondTime) / 1000;
        diff /= 60;
        const time = Math.abs(Math.round(diff));
        
        if (time > 9) {
          const alertDat = alerts[i];
          ddd.push(alertDat);
        }
      }
    }
    setAlertData(ddd)
  }, [alerts]);

  var dddd ;


  return (
    <>
      <div className="my-4">
        <Card>
          <form
            className="grid gap-4 grid-cols-1 md:grid-cols-3"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                value={state.startTime}
                type="datetime-local"
                label="Start Time"
                onChange={(e) =>
                  reducerDispatch({
                    type: "update-start-time",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Input
                value={state.endTime}
                type="datetime-local"
                label="End Time"
                onChange={(e) =>
                  reducerDispatch({
                    type: "update-end-time",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <div className="self-end">
              <Button label="submit" type="submit" />
            </div>
          </form>
        </Card>
      </div>

      {isAlertsLoading && <div className="my-4">Loading ...</div>}
      {isEmpty(alerts) && !isAlertsLoading && (
        <div className="p-4 bg-green-500 text-white">No alerts reported</div>
      )}

      {!isAlertsLoading &&

        map(alertData, (alert) => {
          
          const deviceAlert = alert.deviceId == deviceId && alert;
          var dvcAlert ;
          const selectedDeviceId = alert.deviceId;
          const modeId = alert.modeId;
          const filterData = devices[selectedDeviceId];
          
          // const fll = deviceAlert.parameters.filter((itm,index) =>{
          //    return itm.isAlert === true || itm.isWarning === true 
          // })
          
          // const flll = fll[0];
          // const value = flll.value ;
          // var incVal = Math.round(dddd * 21/20);
          // var decVal = Math.round(dddd * 19/20)

          // if(incVal < dddd || decVal > dddd){
          //     dddd = value ;
          //     dvcAlert = deviceAlert ;
          // }else {
          //   dvcAlert = {};
          // }

          console.log(deviceAlert ,"deviceAlert here");
        
          const deviceDta = filterData?.latestDataByModeId.filter(
            (itm, ind) => {
              return itm.modeId === modeId;
            }
          );

          const modeName = deviceDta[0].modeName;
          return (<>
            <Alert
              isWarning={deviceAlert.isWarning}
              key={`${deviceAlert.deviceId}-${deviceAlert.timestamp}`}
              device={deviceAlert.deviceId}
              project={deviceAlert.projectId}
              deviatedParams={deviceAlert.parameters}
              timestamp={deviceAlert?.timestamp}
              modeName={modeName}
            />
          </>);
        })}
    </>
  );
};

export default AlertsHistory;
