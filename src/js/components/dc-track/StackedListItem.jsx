import React from "react";
import { map, isEmpty } from "lodash";
import {
    Link
} from 'react-router-dom';
import "../../../styles/StackedList.css";
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

    return (<>
        <StandardStackedListItem {...props}>
            {
                isEmpty(latestData) && (
                    <div className="p-4 flex-1 border-b flex flex-col justify-center">
                        Yet to recieve data
                    </div>
                )
            }
            {
                !isEmpty(latestData) && (
                    <div className="flex-1 tableBord" >
                        {
                            map(latestData, (displayData, index) => {
                                const displayParams = displayData.parameters;
                                
                                return (<>
                                    <div className="flex border-b">
                                        <StandardStackedListParam  
                                            customStyle={{minWidth:150, width:150}}
                                            name={displayData.modeName}
                                            value={displayData.modeValue}
                                        />                            
                                        {
                                            <StandardStackedListParamTable
                                                displaydata={displayData}
                                            />
                                        }
                                    </div>
                                    </>)
                            })
                        }
                    </div>
                )
            }
        </StandardStackedListItem>
    </>)
}
  
StackedListItem.defaultProps = {
};

StackedListItem.propTypes = {
};
  