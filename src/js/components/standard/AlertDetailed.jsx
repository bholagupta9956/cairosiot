import React from "react";
import PropTypes from "prop-types";
import { map, filter } from "lodash";
import classNames from "classnames";
import dayjs from '../../../helpers/dayjs'


const AlertDetailed = props => {
  
  const { isWarning, device, project, deviatedParams, timestamp , modeName} = props;

  const containerClass = classNames({
      'mb-2 px-4 py-2 border-2 bg-white rounded flex items-center gap-4': true,
      'border-red': !isWarning,
      'border-yellow-500': isWarning  
  });

 
  return (
    <div className={containerClass}>
      <div className="">
        <div>
          Timestamp: <b>{dayjs.utc(timestamp).format("HH:mm:ss DD/MM/YYYY")}</b>
        </div>
      </div>
      <div className="">
        <div>
          modeName: <b>{modeName}</b>
        </div>
      </div>
      <div className="flex gap-2">
        {map(deviatedParams, (param) => {
          const containerClass = classNames({
            "my-2 p-2 border": true,
            "border-red": !param.isWarningDeviated,
            "border-yellow-500": param.isWarningDeviated,
          });
      
          return (
            <>
              {param.key !== "010"  && ( param.isWarning === true  || param.isAlert === true )  && (
                <div className={containerClass}>
                  <div>
                    {param.name} : {param.value}
                  </div>
                  
                </div>
              )}
            </>
          );
        })}
      </div>
      
    </div>
  );
};


AlertDetailed.defaultProps = {
  isWarning: false,
};


AlertDetailed.propTypes = {
  isWarning: PropTypes.bool,
  device: PropTypes.string,
  project: PropTypes.string,
  deviatedParams: PropTypes.array,
  timestamp: PropTypes.string,
};

export default AlertDetailed;
