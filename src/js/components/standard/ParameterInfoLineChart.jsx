import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { range } from 'lodash';

import LineChartV3 from './LineChartV3.jsx';

const ParameterInfoLineChart = props => {
  const { name, unit, value } = props;
  return (
    <div className="w-full h-full py-4 bg-light rounded-lgw-full h-full bg-light rounded-lg w-1/2">
      <div className="text-cardHeading font-medium">{name} { unit ? `- ${unit}` : null }</div>
      <LineChartV3
        labels={range(value.length)}
        datasets={
            [
                {
                label: name,
                borderColor: 'blue',
                data: value,
                fill: false,
                }
            ]
        }
      />
    </div>
  );
}

ParameterInfoLineChart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
};

export default ParameterInfoLineChart;
