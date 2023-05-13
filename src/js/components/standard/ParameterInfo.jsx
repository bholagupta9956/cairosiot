import React from "react";
import PropTypes from 'prop-types';
import { Colors } from "./Color.jsx";

const ParameterInfo = props => {
  
  const { name, unit, value } = props;
  
  return (
    <div className="w-full h-full p-4 bg-light rounded-lgw-full h-full bg-light rounded-lg flex items-center justify-center w-1/2" style={{background : Colors.bgColor , border : Colors.boxBorder ,borderRadius : "7px"}}>
        <div>
          <div className="text-cardHeading font-medium text-center">{name} { unit ? `- ${unit}` : null }</div>
          <div className="text-cardHeading text-dark font-bold text-center " style={{width : "160px" , overflow : "hidden"}}>{value}</div>
        </div>
    </div>
  );
}

ParameterInfo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
};

export default ParameterInfo;
