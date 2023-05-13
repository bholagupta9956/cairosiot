import React, { useEffect, useState } from "react";
import {
  useHistory,
  generatePath 
} from 'react-router-dom';
import { map, size, reduce, values, isEmpty, filter, groupBy } from 'lodash';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProjectsDetails, fetchProjectsDetailsRealTime } from '../../slices/projectsSlice.js';
import { fetchDevicesDetailsUniversal } from '../../slices/devicesSlice.js';
import { getAlerts } from '../../slices/alertsSlice';

import Skeleton from 'react-loading-skeleton';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import Button from "../components/standard/Button.jsx";
import Maps, { Marker } from '../components/standard/Map.jsx';
import Card from '../components/standard/Card.jsx';
import Input from '../components/standard/Input.jsx';
import { StackedListContainer, StackedListItem, StackedListParam } from '../components/standard/StackedList.jsx';
import Alert from '../components/standard/Alert.jsx'
import RagReportTable from "../components/standard/RagReportTable.jsx"

import ParameterCard from '../components/dynamic/ParameterCard.jsx';
// import ParameterCard from '../components/standard/ParameterCard.jsx';
// import GuageChartV3 from '../components/standard/GuageChartV3.jsx';
// import DoughnoutChart from '../components/standard/DoughnoutChart.jsx';

import { searchFilter } from "../../helpers/utils"
import { getIsSuperAdmin } from '../../helpers/auth'

const AllDetails = props => {
  
  const { userDetails } = props;
  const [ searchQuery, setSearchQuery ] = useState()
  const { isLoading, projects } = useSelector((state) => state.projects);
  const { isLoading: isDevicesLoading, devices: devicesById } = useSelector((state) => state.devicesDetails);
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    const companyId = userDetails.companyId
  
    dispatch(fetchProjectsDetails(companyId))
    dispatch(fetchDevicesDetailsUniversal({ companyId }))
  }, []);
  
//   useEffect(() => {
//     const intervalTimer = setInterval(() => {
//       const companyId = userDetails.companyId
//       dispatch(fetchProjectsDetailsRealTime(companyId))
//     }, reloadTime)

//     return () => clearInterval(intervalTimer)
//   }, [reloadTime])

  if(isLoading || isDevicesLoading) {
    return (
      <DashboardLayout>
        <Skeleton height="60vh" />
        <div className="my-4">
          <Skeleton height="5vh" />
          <Skeleton height="20vh" />
          <Skeleton height="20vh" />
        </div>
      </DashboardLayout>
    )
  }

  if (isEmpty(projects)) {
    return (
      <DashboardLayout>
        <div className="p-4 border-1">
          You dont have any projects assigned to you. Please contact your admin.
        </div>
      </DashboardLayout>
    )
  }

  const handleViewProject = projectId => {
    const path = generatePath("/:projectId", { projectId });
    history.push(path);
  };

  const handleSearchQuery = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSearchQuery(value)
  }

  const results = searchFilter(values(projects), [ 'name' ], searchQuery)
  const isSuperAdmin = getIsSuperAdmin(userDetails)

  const deviceByProjectId = groupBy(devicesById, 'projectId')

  
  return (
    <DashboardLayout>
      <div className="my-4 grid gap-4 grid-cols-8 grid-rows-6">
        <div className="col-span-8 row-span-6">
          <div className="w-full h-full bg-light rounded-lg">
            <div>
                {
                    map(deviceByProjectId, (devicesOfProject, projectId) => {
                        return (
                            <div className="flex border-t border-l border-r first:border-t-0">
                                <div className="p-4 w-1/6">{projects[projectId]?.name}</div>
                                <div className="flex-1">
                                    {
                                        map(devicesOfProject, (device, id) => {
                                            return (
                                                <div className="flex border-t border-l first:border-t-0">
                                                    <div className="p-4 w-1/4">{device.name}</div>
                                                    <div className="flex-1">
                                                        {
                                                            map(device.latestDataByModeId, (modeDetails, modeId) => {
                                                                return (
                                                                    <div className="flex border-t border-l first:bg-primary-50">
                                                                        <div className="p-4 w-1/4">{modeDetails.modeName} - {modeDetails.modeValue}</div>
                                                                        <div className="flex-1">
                                                                            {
                                                                                map(modeDetails.parameters, (parameter, index) => {
                                                                                    return (
                                                                                        <div className="p-4 flex-1 border-t border-l first:border-t-0">{parameter.name} - {parameter.value}</div>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


export default AllDetails;