import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie, VictoryContainer, VictoryTheme } from 'victory';

const GuageChart = props => {
  const {
      value,
      maxValue,
      size,
      isDanger,
  } = props;

  const emptyValue = maxValue - value;
  
  const activeColor = isDanger ? "rgba(231, 17, 17, 1)"  : "rgba(47, 73, 209, 1)";
  const backgroundColor = "rgba(244, 245, 247, 1)"

  const containerSize = size / 2;

  return (
    <div className="relative">
        <VictoryPie
            containerComponent={<VictoryContainer height={containerSize} width={size} style={{ touchAction: "auto" }} />}
            startAngle={-90}
            endAngle={90}
            innerRadius={containerSize}
            height={size}
            width={size}
            labels={() => null}
            colorScale={[activeColor, backgroundColor]}
            data={[ value, emptyValue ]}
        />
        <div className="text-center -mt-10 text-heading font-bold">{value}</div>
    </div>
    
  );
}

GuageChart.defaultProps = {
    size: 300,
    value: 90,
    maxValue: 100,
    isDanger: false,
};

GuageChart.propTypes = {
    size: PropTypes.number,
    value: PropTypes.number,
    maxValue: PropTypes.number,
    isDanger: PropTypes.bool
};

export default GuageChart;