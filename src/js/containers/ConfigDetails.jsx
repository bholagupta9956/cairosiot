// here Config details like Device part and its details will be maintained ;

import React from "react";
import "../../styles/configDetails.css";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import BackArrow from "../../images/icons/arrow.png";
import { useHistory } from "react-router-dom";
import { map, size, reduce, values, isEmpty, filter, groupBy } from "lodash";
import { useRef } from "react";


const ConfigDetails = () => {
  
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const devicesOfProject = state?.devicesOfProject;
  const projectId = state?.devicesOfProject;
  const projectName = state?.projectName;
 
  return (
    <>
      <DashboardLayout>
        <div className="configTable">
          <div className="configTabHead">
            <img
              src={BackArrow}
              alt=""
              className="backArrow"
              onClick={() => history.goBack()}
            />
            <button className="confDown" >
              Download
            </button>
            <h2>{projectName}</h2>
          </div>
          <div className="configDetails">
            {/* here creating devices first of all */}
            <div className="conDev">
              {devicesOfProject &&
                map(devicesOfProject, (device, id) => {
                  return (
                    <>
                      <div className="deviceDetails">
                        <h4>
                          {device.name} - {device.deviceId}
                        </h4>
                        <div className="conmode">
                          {map(
                            device.latestDataByModeId,
                            (modeDetails, modeId) => {
                              return (
                                <>
                                  <div className="modeDetails">
                                    <h4>
                                      {modeDetails.modeName} -{" "}
                                      {modeDetails.modeValue} -{" "}
                                      {modeDetails.modeId}
                                    </h4>

                                    <div className="conParams">
                                      {map(
                                        modeDetails.parameters,
                                        (parameter, index) => {
                                          return (
                                            <>
                                              <h4>
                                                {" "}
                                                {parameter.name} -{" "}
                                                {parameter.key}
                                              </h4>
                                            </>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};


export default ConfigDetails;
