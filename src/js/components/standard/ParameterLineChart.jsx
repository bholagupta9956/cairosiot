
import React from "react";
import PropTypes from 'prop-types';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { range } from 'lodash';
import LineChartV2 from '../standard/LineChartV2.jsx';
// import { Line } from 'react-chartjs-2';
import Card from './Card.jsx';
// import * as Zoom from "chartjs-plugin-zoom";

const ParameterLineChart = props => {
    const {
        name,
        unit,
        value,
        color
    } = props;


    return (
        <Card>
            <LineChartV2
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
            <div className="text-cardHeading font-medium text-center">{name} { unit ? `- ${unit}` : null }</div>
        </Card>
    );
}


ParameterLineChart.defaultProps = {
    labenamel: "Parameter Name",
    unit: "Par",
    value: [5, 10, 17, 15],
    color: 'red'
};


ParameterLineChart.propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    unit: PropTypes.string,
    color: PropTypes.string
};

export default ParameterLineChart;