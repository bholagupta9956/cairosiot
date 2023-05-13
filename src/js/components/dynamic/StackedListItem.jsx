import React from "react";
import {
    POINT_MACHINE,
    DC_TRACK,
    SIGNAL
} from '../../constants/deviceTypes';

import {
    StackedListItem as PointMachineStackedListItem
} from '../point-machine/StackedListItem.jsx';

import {
    StackedListItem as DCTrackStackedListItem
} from '../dc-track/StackedListItem.jsx';

import {
    StackedListItem as SignalTrackStackedListItem
} from '../signal/StackedListItem.jsx';



const StackedListItem = props => {
    
    switch (props.type) {
        case POINT_MACHINE: {
            return (
                <PointMachineStackedListItem {...props} />
            )
        }

        case DC_TRACK: {
            return (
                <DCTrackStackedListItem {...props} />
            )
        }

        case SIGNAL: {
            return (
                <SignalTrackStackedListItem {...props} />
            )
        }

        default: {
            return (
                <PointMachineStackedListItem {...props} />

            )
        }
    }
}


export default StackedListItem;
