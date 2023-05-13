import React from "react";
import PropTypes from 'prop-types';
import Card from './Card.jsx'
import { Colors } from "./Color.jsx";

const ParameterCard = props => {
  
  const { name, unit, value  } = props;

  return (
    <div className="flex items-center justify-center w-full h-full p-4 bg-light rounded-lgw-full bg-light rounded-lg" style={{background : Colors.bgColor , border : Colors.boxBorder}}>
        <div >
            <div className="text-heading text-dark font-bold text-center" >{value}</div>
            <div className="text-cardHeading font-medium text-center">{name} { unit ? `- ${unit}` : null }</div>
        </div>
    </div>
  );
};


ParameterCard.propTypes = {
  // children: PropTypes.oneOfType([
  //   PropTypes.element,
  //   PropTypes.array,
  // ]).isRequired
};

export default ParameterCard;
