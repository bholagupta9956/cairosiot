import React from "react";
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";
// import * as Zoom from "chartjs-plugin-zoom";

const DoubleVariableLineGraph = props => {
    
    const {
        name,
        labels,
        data,
        name2,
        labels2,
        data2
    } = props;

    const series = [
        {
          name: name,
          data: data,
        },
        {
            name: name2,
            data: data2
        }
    ];

    const options = {
        chart: {
          id: name
        },
        stroke: {
            width: 3
        },
        colors: ['rgba(47, 73, 209, 1)', '#545454'],
        xaxis: {
          categories: labels,
          categories: labels2
        }
    };

    return (
        <>
            <Chart
                options={options}
                series={series}
                type="line"
            />
        </>
    );
}

DoubleVariableLineGraph.defaultProps = {
    name: "Name",
    labels: [ '20-04-2021 22:30', '20-04-2021 22:35', '20-04-2021 22:40', '20-04-2021 22:45' ],
    data: [5, 10, 17, 15]
};

DoubleVariableLineGraph.propTypes = {
    name: PropTypes.string,
    labels: PropTypes.array,
    data: PropTypes.array
};

export default DoubleVariableLineGraph;
