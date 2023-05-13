import React from "react";
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";
// import * as Zoom from "chartjs-plugin-zoom";

const SingleVariableLineGraph = props => {
    const {
        name,
        labels,
        data
    } = props;

    const series = [
        {
          name: name,
          data: data
        }
    ];

    const options = {
        chart: {
          id: name
        },
        stroke: {
            width: 3
        },
        colors: ['rgba(47, 73, 209, 1)'],
        xaxis: {
          categories: labels
        }
    };

    return (
        <Chart
            options={options}
            series={series}
            type="line"
        />
    );
}

SingleVariableLineGraph.defaultProps = {
    name: "Name",
    labels: [ '20-04-2021 22:30', '20-04-2021 22:35', '20-04-2021 22:40', '20-04-2021 22:45' ],
    data: [5, 10, 17, 15]
};

SingleVariableLineGraph.propTypes = {
    name: PropTypes.string,
    labels: PropTypes.array,
    data: PropTypes.array
};

export default SingleVariableLineGraph;