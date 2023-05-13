import React from "react";
import PropTypes from 'prop-types';
import { Colors } from "./Color.jsx";

const Card = props => {
  const { children } = props;

  return (
    <div className="w-full h-full p-4 bg-light rounded-lg" style={{background : Colors.bgColor , border : Colors.boxBorder , borderRadius : "7px"}}>
        {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
};

export default Card;