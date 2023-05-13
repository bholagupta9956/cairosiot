import React from "react";
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const colorMap = {
    'warning': "rgba(246, 162, 30, 1)",
    'danger': "rgba(231, 17, 17, 1)",
    'regular': "rgba(47, 73, 209, 1)"
}

const GuageChartV2 = props => {
  const {
      value,
      maxValue,
      isDanger,
      isWarning,
  } = props;

  const emptyValue = maxValue - value;
  
  const activeColor = isDanger ? colorMap["danger"]
    : (isWarning ? colorMap["warning"] : colorMap["regular"]);

  const backgroundColor = "rgba(244, 245, 247, 1)"

    const data = {
        datasets: [{
            data: [value, emptyValue],
            borderWidth: 0,
            backgroundColor: [
                activeColor,
                backgroundColor
            ],
            hoverBackgroundColor: [
                activeColor,
                backgroundColor
            ]
        }]
    };

    return (
        <div>
            <Doughnut
                data={data}
                options={{
                    aspectRatio: 1,
                    tooltips: {
                        enabled: false
                    },
                    cutoutPercentage: 60,
                    animation: false,
                    maintainAspectRatio: true,
                    circumference: Math.PI,
                    rotation: Math.PI,
                }}
            />
            <div className="text-center -mt-6 text-cardHeading md:-mt-10 md:text-heading font-bold">{value}</div>
        </div>
    );
}

GuageChartV2.defaultProps = {
    value: 60,
    maxValue: 100,
    isDanger: false,
    isWarning: false
};

GuageChartV2.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    maxValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    isDanger: PropTypes.bool,
    isWarning: PropTypes.bool
};

export default GuageChartV2;