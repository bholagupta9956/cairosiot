import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useHistory
} from 'react-router-dom';
import { times, size } from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton';
import { fetchProjectsDetails, followProject } from '../../slices/projectsSlice.js';
import { fetchDevicesDetails } from '../../slices/devicesSlice';
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import Settings from '../components/project-dashboard/Settings.jsx'
import Card from '../components/standard/Card.jsx';
import ParameterInfo from '../components/standard/ParameterInfo.jsx';


const ProjectSettings = props => {
  const { userDetails } = props;
  const { search } = useLocation();
  const { projectId } = useParams();
  
  const { isLoading: isProjectsLoading, projects } = useSelector((state) => state.projects);
  const { isLoading, devices } = useSelector((state) => state.devicesDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    const companyId = userDetails.companyId
    dispatch(fetchProjectsDetails(companyId))
    dispatch(fetchDevicesDetails(projectId))
  }, [projectId]);


  if(isProjectsLoading) {
    return (
      <DashboardLayout>
        <div className="my-4 grid gap-4 grid-cols-2 xl:grid-cols-4">
          {
            times(4, index => (
              <Card key={index}>
                <div className="text-center">
                  <div className="text-heading text-dark font-bold"> <Skeleton /> </div>
                  <div className="text-cardHeading text-dark font-medium"> <Skeleton /> </div>
                </div>
              </Card>
            ))
          }
        </div>
        <Skeleton height="50vh" />
        <div className="my-4">
          <Skeleton height="5vh" />
          <Skeleton height="20vh" />
          <Skeleton height="20vh" />
        </div>
        
      </DashboardLayout>
    )
  }

  const projectDetails = projects[projectId];
  // const usersList = usersByProject[projectId];

  return (
    <DashboardLayout>

      <div className="my-4">
        <Card>
          <div className="text-subHeading text-dark font-bold">{projectDetails.name} - Details</div>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
            <ParameterInfo
              name="Number of Equipment"
              value={size(devices)}
            />
            <ParameterInfo
              name="Active Equipment"
              value={size(devices)}
            />
            <ParameterInfo
              name="Alerts"
              value="-"
            />
          </div>
        </Card>
      </div>
      
      <div className="my-4 flex rounded">
        <Link to={`/${projectId}`} className="p-4 bg-light cursor-pointer">Equipment List</Link>
        <Link to={`/${projectId}/settings`} className="p-4 bg-primary cursor-pointer text-white">Settings</Link>
      </div>

      <Settings
        // usersList={usersList}
        // onInvite={handleInviteUserbyEmail}
      />
    </DashboardLayout>
  );
}

export default ProjectSettings;