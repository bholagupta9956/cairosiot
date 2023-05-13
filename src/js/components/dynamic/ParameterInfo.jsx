import React from "react";

import {
    TEXT_BOX, GUAGE, LINE_GRAPH
} from '../../constants/parameterTypes';

import StandardParameterInfo from '../standard/ParameterInfo.jsx';
import ParameterInfoLineChart from '../standard/ParameterInfoLineChart.jsx';
import ParameterInfoGuageChart from '../standard/ParameterInfoGuageChart.jsx';
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";


const ParameterInfo = props => {
    
    switch (props.type) {
        case TEXT_BOX: {
            return (<>
                <StandardParameterInfo {...props} />
                </>)
        }

        case GUAGE: {
            return (<>
                <ParameterInfoGuageChart {...props} />
                </>)
        }

        case LINE_GRAPH: {
            return (<>
                <ParameterInfoLineChart {...props} />
                </>)
        }

        default: {
            return (<>
                <StandardParameterInfo {...props} />
                </>)
        }
    }
}

export default ParameterInfo;


