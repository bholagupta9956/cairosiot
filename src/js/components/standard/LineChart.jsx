import React from "react";
import PropTypes from 'prop-types';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory';

import { times, map, random } from 'lodash';

const LineChart = props => {
    return (
        <VictoryChart
            standalone={true}
            theme={VictoryTheme.material}
            containerComponent={<VictoryZoomContainer />}
            width={1000}
            height={300}
            // scale={{ x: "time" }}
        >
            {
                map(props.parameters, paramsArray => {
                    return (
                        <VictoryLine
                            data={paramsArray}
                        />
                    );
                })
            }
            
        </VictoryChart>
    );
}

LineChart.defaultProps = {
    size: 300,
    value: 90,
    maxValue: 100,
    isDanger: false,
};

LineChart.propTypes = {
    size: PropTypes.number,
    value: PropTypes.number,
    maxValue: PropTypes.number,
    isDanger: PropTypes.bool
};

export default LineChart;