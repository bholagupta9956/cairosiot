import React from "react";
import PropTypes from "prop-types";
import { map, filter } from "lodash";
import {
  Link,
  useLocation,
  useParams,
  useHistory,
  generatePath,
} from "react-router-dom";
import classNames from "classnames";
import dayjs from "../../../helpers/dayjs";
import { consolidateErrors } from "../../../helpers/utils";


const Alert = (props) => {

  const history = useHistory();

  const {
    isWarning,
    device,
    deviceId,
    project,
    projectId,
    parameters,
    timestamp,
    devicesById,
    modeName,
  } = props;

  const deviatedParams = isWarning
    ? filter(parameters, { isWarning: true })
    : filter(parameters, { isAlert: true });

  const handleClick = (e) => {
    e.preventDefault();
    const path = generatePath("/:projectId/device/:deviceId/alerts", {
      projectId: projectId,
      deviceId: deviceId,
    });
    history.push(path);
  };

  const containerClasses = classNames({
    "mb-2 p-4 border-2 rounded flex items-center gap-4 cursor-pointer text-small": true,
    "border-red": !isWarning,
    "border-yellow-500": isWarning,
  });



  return (
    <div className={containerClasses} onClick={handleClick}>
      <div className="">
        <div>
          Time: <b>{dayjs.utc(timestamp).format("HH:mm")} </b>
          {device && (
            <>
              Equipment: <b>{device} </b>
            </>
          )}
          {modeName && (
            <>
              {" "}
              Mode : <b>{modeName}</b>
            </>
          )}
          {project && (
            <>
              Location: <b>{project} </b>
            </>
          )}
          {map(deviatedParams, (param) => {
            return (
              <>
                {" "}
                {param.name}:{" "}
                <b>
                  {param.value}
                  {param.unit ? `${param.unit}` : null}
                </b>{" "}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};


Alert.defaultProps = {
  isWarning: false,
};


Alert.propTypes = {
  isWarning: PropTypes.bool,
  device: PropTypes.string,
  deviceId: PropTypes.string,
  project: PropTypes.string,
  projectId: PropTypes.string,
  deviatedParams: PropTypes.array,
  timestamp: PropTypes.string,
};

export default Alert;
