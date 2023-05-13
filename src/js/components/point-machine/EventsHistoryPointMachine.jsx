import React, { useReducer, useEffect } from "react";
import { map, groupBy, forEach, isEmpty } from "lodash";

import Card from "../standard/Card.jsx";
import Input from "../standard/Input.jsx";
import Button from "../standard/Button.jsx";
import { isArray } from "validate.js";
import Chart from "react-apexcharts";

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

const EventsHistoryPointMachine = (props) => {
  
  const {
    isLoading,
    initialTimestamp,
    deviceEvents,
    prametersByModeId,
    deviceType,

    handleTimeFrameChange,
  } = props;

  const [state, reducerDispatch] = useReducer(reducer, initialTimestamp);

  const eventsByMode = groupBy(deviceEvents, "modeId");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTimeFrameChange(state.startTime, state.endTime);
  };

  const dataObj = [
    {
        "projectId": "lAMOh",
        "entityType": "EventInfo",
        "deviceId": "UaG1g",
        "parameters": [
            {
                "value": [
                    "1",
                    "10",
                    "12",
                    "8",
                    "10",
                    "5",
                    "8",
                    "11"
                ],
                "key": "001"
            }
        ],
        "timestamp": "2022-05-30T22:32:00Z",
        "SK": "TIMESTAMP#2022-05-30T22:32:00Z",
        "PK": "DE#UaG1g",
        "modeId": "0"
    },
    {
        "projectId": "lAMOh",
        "entityType": "EventInfo",
        "deviceId": "UaG1g",
        "parameters": [
            {
                "value": [
                    "10",
                    "5",
                    "13",
                    "5",
                    "12",
                    "5",
                    "8",
                    "12"
                ],
                "key": "001"
            }
        ],
        "timestamp": "2022-05-30T22:33:00Z",
        "SK": "TIMESTAMP#2022-05-30T22:33:00Z",
        "PK": "DE#UaG1g",
        "modeId": "0"
    },
    {
        "projectId": "lAMOh",
        "entityType": "EventInfo",
        "deviceId": "UaG1g",
        "parameters": [
            {
                "value": [
                    "9",
                    "10",
                    "13",
                    "12",
                    "11",
                    "9",
                    "1",
                    "3"
                ],
                "key": "001"
            }
        ],
        "timestamp": "2022-05-30T22:34:00Z",
        "SK": "TIMESTAMP#2022-05-30T22:34:00Z",
        "PK": "DE#UaG1g",
        "modeId": "0"
    }
];
  let series = [];
  let maxNumberOfValues = 0;

  forEach(deviceEvents, (data, index)=> {
    let values = [];
    if(data.parameters && isArray(data.parameters)&& data.parameters.length>0 && isArray(data.parameters[0].value)) {
      values= data.parameters[0].value;
      
      if(maxNumberOfValues<data.parameters[0].value.length) {
        maxNumberOfValues = data.parameters[0].value.length;
      }
    }
    series.push({
      name:data.timestamp,
      data:values
    });

  })

  let labels = [];
  for(let i=0; i<maxNumberOfValues;i++) {  
    labels.push(20 * (i+1));
  }

  let options = {
    chart: {
      id: "PointMachine"
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    colors: ['rgba(47, 73, 209, 1)', '#545454'],
    xaxis: {
      categories: labels
    },
    legend: {
      show: false,
    }
};

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
                          onChange={e => reducerDispatch({ type: 'update-start-time', value: e.target.value })}
                      />
                  </div>
                  <div>
                      <Input
                          value={state.endTime}
                          type="datetime-local"
                          label="End Time"
                          onChange={e => reducerDispatch({ type: 'update-end-time', value: e.target.value })}
                      />
                  </div>
                  <div className="self-end">
                      <Button label="submit" type="submit" />
                  </div>
              </form>
          </Card>
        </div>
        {
          isLoading && (
            <div className="my-4">
              Loading ...
            </div>
          )
        }
        {
          !isLoading &&
          (
            <>
              <div className="grid gap-4 grid-cols-2">
                <Card>
                  <Chart
                    options={options}
                    series={series}
                    type="line"
                  />
                </Card>
              </div>
            </>
          )
        }
    </>
  );
};

export default EventsHistoryPointMachine;
