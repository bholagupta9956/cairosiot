import React from "react";
import PropTypes from 'prop-types';
import { filter, map, orderBy, isEmpty } from 'lodash';
import Chart from "react-apexcharts";
// import * as Zoom from "chartjs-plugin-zoom";

const MultiVariableLineGraph = props => {
    const {
        data,
        modeId
    } = props;


    const dataForCombinedGraph = filter(data, parameterData => {
        if(parameterData.modeId==modeId && parameterData.parameterDetails?.mergeInGraph=="true") {
            return true;
        } else {
            return false;
        }
    });

    let name = ""
    const series = map(dataForCombinedGraph, parameterData => {
        if(name.length==0) {
            name+=parameterData.parameterDetails.name
        } else {
            name+=", " + parameterData.parameterDetails.name
        }
        return {
            name:parameterData.parameterDetails.name,
            data:parameterData.values
        }

    })


    const labels = dataForCombinedGraph.length>0?dataForCombinedGraph[0].timeline:[];
    const options = {
        chart: {
          id: name
        },
        stroke: {
            width: 3
        },
        colors: ['rgba(47, 73, 209, 1)', '#545454'],
        xaxis: {
          categories: labels
        }
    };

    return (
        <>
        <div className="text-cardHeading text-dark font-bold">
            {name}
        </div>
        <Chart
            options={options}
            series={series}
            type="line"
        />
        </>
    );
}

MultiVariableLineGraph.defaultProps = {
    modeId: 0,
    data: [{
        "values": [
            "170",
            "170",],

        "timeline": [
            "2022-05-23T16:58:55Z",
            "2022-05-23T17:09:09Z",
        ],
        "modeId": "1",
        "parameterId": "111",
        "parameterDetails": {
            "unit": "mA",
            "minValue": "0",
            "maxValue": "220",
            "name": "Current",
            "gaugeMinValue": "200",
            "gaugeMaxValue": "250",
            "mergeInGraph": "true",
            "type": "guage",
            "value": "00",
            "key": "111",
            "showAverage": "true"
        }
    }]
};

MultiVariableLineGraph.propTypes = {
    modeId: PropTypes.number,
    data: PropTypes.array
};

export default MultiVariableLineGraph;