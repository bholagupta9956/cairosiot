import React, { useReducer, useEffect, useState } from "react";
import { map, groupBy, forEach, isEmpty, filter } from "lodash";
import Card from "../standard/Card.jsx";
import Input from "../standard/Input.jsx";
import Button from "../standard/Button.jsx";
import { Table, TableRow, TableHeader, TableData } from "../standard/Table.jsx";
import SingleVariableLineGraph from "../standard/SingleVariableLineGraph.jsx";
import { events } from "../../../mocks/dcMachineEvents.js";
import { isArray } from "validate.js";
import { mode } from "../../../../tailwind.config.js";
import DoubleVariableLineGraph from "../standard/DoubleVariableLineGraph.jsx";
import EventsHistoryPointMachine from "../point-machine/EventsHistoryPointMachine.jsx";
import MultiVariableLineGraph from "../standard/MultiVariablesLineGraph.jsx";


// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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


const EventsHistory = (props) => {

  const {
    isLoading,
    initialTimestamp,
    deviceDetails,
    deviceEvents,
    prametersByModeId,
    deviceType,
    handleTimeFrameChange,
  } = props;

  const [state, reducerDispatch] = useReducer(reducer, initialTimestamp);

  const [showGraph , setShowGraph] = useState(false);

  const eventsByMode = groupBy(deviceEvents, "modeId");


  const handleSubmit = (e) => {
    e.preventDefault();
    // toast("bhola gupta", { type: "success" });
    handleTimeFrameChange(state.startTime, state.endTime);
  };

  const dataObj = {};

  const parameterNames = {};

  console.log(prametersByModeId , "parametersbymodeid");

  forEach(prametersByModeId, (prametersByMode, modeId) => {
    forEach(prametersByMode.parameters, (parameter) => {
      parameterNames[`${modeId}-${parameter.key}`] = parameter;
    });
  });

  forEach(eventsByMode, (eventsOfMode, modeId) => {
    const timeline = map(eventsOfMode, (event) => event.timestamp);

    forEach(eventsOfMode, (event) => {
      forEach(event.parameters, (parameter) => {
        if (!isArray(dataObj[`${modeId}-${parameter.key}`]?.values)) {
          dataObj[`${modeId}-${parameter.key}`] = {
            values: [],
            timeline: timeline,
            modeId: modeId,
            parameterId: parameter.key,
            parameterDetails: parameterNames[`${modeId}-${parameter.key}`],
          };
        }
        dataObj[`${modeId}-${parameter.key}`].values.push(parameter.value);
      });
    });
  });

  const dataArray = Object.values(dataObj);

  //let res=0;
  function calcAverage(values) {
    let sum = 0;
    let itr = 0;
    let res = 0;
    for (let item = 0; item < values.length; item++) {
      sum += parseFloat(values[item]);
      itr++;
    }
    res = sum / itr;
    return parseFloat(res).toFixed(2);
  }

  let last_modeId = -1 ;

  // here the code is just for rendering the graph after 3sec just for remove the project lack;

  setTimeout(() => {
    setShowGraph(true)
  }, 2000);

  if (deviceType == "point_machine") {
    return (
      <>
        <EventsHistoryPointMachine
          isLoading={isLoading}
          initialTimestamp={initialTimestamp}
          deviceEvents={deviceEvents}
          prametersByModeId={prametersByModeId}
          deviceType={deviceType}
          handleTimeFrameChange={handleTimeFrameChange}
          dataObj={dataObj}
        />
      </>
    );
  }

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

      {isLoading && <div className="my-4">Loading ...</div>}
      {!isLoading && (
        <>
          <div className="grid gap-4 grid-cols-2">
            {map(dataArray, (data, i) => {
              let current_modeId = data.modeId;
              let next_modeId = dataArray[i + 1]?.modeId;
              let new_mode = false;
              if (current_modeId != last_modeId) {
                last_modeId = current_modeId;
                new_mode = true;
              }
              let combinedGraph = <></>;
              if (
                current_modeId != next_modeId && 
                filter(
                  dataArray,
                  (parameterData) =>
                    parameterData.modeId == current_modeId &&
                    parameterData.parameterDetails?.mergeInGraph == "true"
                ).length > 1
              ) {
                combinedGraph = (
                  <>
                  {showGraph ? 
                    <Card>
                      <MultiVariableLineGraph
                        data={dataArray}
                        modeId={current_modeId}
                      />
                    </Card>  : "...."}                    <br></br>
                  </>
                );
              }

              let dataWithCurrentModeIdAndShowAverage = filter(
                dataArray,
                (parameterData) =>
                  parameterData.modeId == current_modeId &&
                  parameterData.parameterDetails?.showAverage == "true"
              );
              let modeName = "";
              let modeValue = "";
              if (new_mode && isArray(deviceDetails.latestDataByModeId)) {
                forEach(deviceDetails.latestDataByModeId, (modeData) => {
                  if (modeData.modeId == current_modeId) {
                    if (modeData.modeName) modeName = modeData.modeName;
                    if (modeData.modeValue) modeValue = modeData.modeValue;
                  }
                });
              }
              return (
                <>
                  {new_mode && (
                    <>
                      <Card>
                        <div className="col-span-3 xl:col-span-4 p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center">
                          <div>
                            <div className="text-cardHeading font-medium">
                              {modeName}
                            </div>
                            <div className="text-cardHeading text-dark font-bold">
                              {modeValue}
                            </div>
                          </div>
                        </div>
                      </Card>
                      <br></br>
                      {dataWithCurrentModeIdAndShowAverage &&  map(
                        dataWithCurrentModeIdAndShowAverage,
                        (currentmodedata, i) => {
                          return (
                            <>
                              <Card>
                                <div className="p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center">
                                  Average-{" "}
                                  {currentmodedata.parameterDetails.name}{" "}
                                  {calcAverage(currentmodedata.values)}
                                </div>
                              </Card>
                              {i ==
                                dataWithCurrentModeIdAndShowAverage.length -
                                  1 &&
                                i % 2 == 0 && <br></br>}
                            </>
                          );
                        }
                      )}
                    </>
                  )}

                  {showGraph ? 
                  <Card>
                    <div className="text-cardHeading text-dark font-bold">
                      {data.parameterDetails?.name}
                    </div>
                 
                    <SingleVariableLineGraph
                      name={data.parameterDetails?.name}
                      labels={data.timeline}
                      data={data.values}
                    />
                  </Card> : "...."}
                  {combinedGraph}
                </>
              );
            })}
            {
                    // <Card>
                    //   <div className="text-cardHeading text-dark font-bold">Voltage - Location - Feedend</div>
                    //     <SingleVariableLineGraph />
                    // </Card>
                  }
            
          </div> 
        </>
      )}
    </>
  );
};

export default EventsHistory;
