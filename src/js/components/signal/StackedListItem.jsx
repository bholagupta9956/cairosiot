import React from "react";
import { map, first, isEmpty, orderBy } from "lodash";
import {
    Link
} from 'react-router-dom';

import { StackedListItem as StandardStackedListItem, StackedListParam as StandardStackedListParamTable } from "../standard/StackedListTable.jsx"; 
import { StackedListParam as StandardStackedListParam } from "../standard/StackedList.jsx";

import { Table, TableRow, TableHeader, TableData } from '../standard/Table.jsx';

export const StackedListItem = props => {
    const {
        id,
        latestData,
        name,
        onViewDetails
    } = props;

    const latestDataBytimestamp = orderBy(latestData, 'timestamp', 'desc')
    const displayData = first(latestDataBytimestamp);
    // const displayParams = displayData.parameters;
    return (
        <StandardStackedListItem {...props}>
            {
                isEmpty(displayData) && (
                    <div
                        className="p-4 flex-1 border-b flex flex-col justify-center"
                    >
                        Yet to recieve data
                    </div>
                )
            }
            {
                 !isEmpty(displayData) && (
                    <StandardStackedListParam customStyle={{minWidth:150, width:150}} 
                        name={displayData.modeName}
                        value={displayData.modeValue}
                    />
                 )
            }
            {
                !isEmpty(displayData) && (
                    <StandardStackedListParamTable
                        displaydata={displayData}
                    />
                )
            }
        </StandardStackedListItem>
    )
}
  
StackedListItem.defaultProps = {
};

StackedListItem.propTypes = {
};
  