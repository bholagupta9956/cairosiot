import React from "react";
import { filter, map, orderBy, isEmpty } from 'lodash';
import { Table, TableData, TableHeader, TableRow } from "./Table.jsx";
import dayjs from "../../../helpers/dayjs";
import { Colors } from "./Color.jsx";


const RagReportTable = (props) => {
    const { devicesById, drpListVal, projects } = props;

    const dueDevices = filter(devicesById, device => {
        if (!device?.maintenanceDate && !device?.maintenancePeriod) {
            return false
        }

        const nextMaintainenceDate = dayjs(device.maintenanceDate, 'YYYY-MM-DD').add(device.maintenancePeriod, 'd')
        
        if (drpListVal == "-1") {
            return dayjs().isAfter(nextMaintainenceDate, 'day')
        }

        const startDate = dayjs()
        const endDate = dayjs().add(drpListVal, 'd')

        return dayjs(nextMaintainenceDate).isBetween(startDate, endDate)
    })

    const dueDevicesSorted = orderBy(dueDevices, 'maintenanceDate', ['asc']);

    const tableRowStyles = {
        border : `1px solid ${Colors.blue}`
    }

    return(
        <Table className="table table-bordered"  >
                <TableRow styles={tableRowStyles}>
                    <TableHeader className="p-2 text-left" cols={2}>Equipment Name</TableHeader>
                    <TableHeader className="p-2 text-left" cols={2}>Maintenance Due On</TableHeader>
                    <TableHeader className="p-2 text-left">Location</TableHeader>
                </TableRow>
                {
                    isEmpty(dueDevicesSorted) &&
                    (
                        <TableRow styles={tableRowStyles}> 
                            <TableData className="text-center" cols={5}>
                                No deivce Due
                            </TableData>
                        </TableRow>
                    )
                }
                {
                    map(dueDevicesSorted, device => {
                        const nextMaintainenceDate = dayjs(device.maintenanceDate, 'YYYY-MM-DD').add(device.maintenancePeriod, 'd')
                        return (
                            <TableRow>
                                <TableData cols={2}>
                                    {device.name}
                                </TableData>
                                <TableData cols={2}>
                                    {nextMaintainenceDate.format('DD-MM-YYYY')}
                                </TableData>
                                <TableData >
                                    {projects[""+device.projectId]?.name}
                                </TableData>
                            </TableRow>
                        )
                    })
                }
        </Table>
    );
}

export default RagReportTable;
