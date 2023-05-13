import React from "react";

import {
    TEXT_BOX, GUAGE, LINE_GRAPH, DOUGHNUT_CHART, INLINE_DOUGHNUT_CHART
} from '../../constants/parameterTypes';

import ParameterCard from "../standard/ParameterCard.jsx";

import ParameterInfo from '../standard/ParameterInfo.jsx';

import GuageChart from "../standard/ParameterInfoGuageChart.jsx";

import ParameterLineChart from "../standard/ParameterLineChart.jsx";

import DoughnoutChart from "../standard/DoughnoutChart.jsx";

import InlineDoughnoutChart from "../standard/InlineDoughnoutChart.jsx";

const StackedListItem = props => {
   
    switch (props.type) {
        case TEXT_BOX: {
            return (
                <ParameterCard {...props} />
            )
        }

        case GUAGE: {
            return (
                <GuageChart {...props} />
            )
        }

        case LINE_GRAPH: {
            return (
                <ParameterLineChart {...props} />
            )
        }

        case DOUGHNUT_CHART: {
            return (
                <DoughnoutChart {...props} />
            )
        }

        case INLINE_DOUGHNUT_CHART: {
            
            return (
                <InlineDoughnoutChart {...props} />
            )
        }

        default: {
            return (
                <ParameterCard {...props} />
            )
        }
    }
}

export default StackedListItem;
