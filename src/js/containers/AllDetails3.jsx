// This is the third page for the config part ;
import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import { useHistory, generatePath } from "react-router-dom";
import "../../styles/allDetails2.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import {
  fetchProjectsDetails,
  fetchProjectsDetailsRealTime,
} from "../../slices/projectsSlice.js";
import { fetchDevicesDetailsUniversal } from "../../slices/devicesSlice.js";
import Container from "@material-ui/core/Container";
import { map, size, reduce, values, isEmpty, filter, groupBy } from "lodash";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { searchFilter } from "../../helpers/utils";
import { getIsSuperAdmin } from "../../helpers/auth";
import { useSelector, useDispatch } from "react-redux";
import BackArrow from "../../images/icons/arrow.png";
import RightArrow from "../../images/icons/rightArrow.png";


const AllDetails3 = (props) => {
  const history = useHistory();
  const { userDetails } = props;
  const [searchQuery, setSearchQuery] = useState();
  const { isLoading, projects } = useSelector((state) => state.projects);
  const { isLoading: isDevicesLoading, devices: devicesById } = useSelector(
    (state) => state.devicesDetails
  );

  useEffect(() => {
    const companyId = userDetails.companyId;
    dispatch(fetchProjectsDetails(companyId));
    dispatch(fetchDevicesDetailsUniversal({ companyId }));
  }, []);

  const dispatch = useDispatch();
  const results = searchFilter(values(projects), ["name"], searchQuery);
  const isSuperAdmin = getIsSuperAdmin(userDetails);
  const deviceByProjectId = groupBy(devicesById, "projectId");

  const handleProjects = (devicesOfProject , projectId ,projectName) =>{
    const data = {
      devicesOfProject : devicesOfProject ,
      projectId : projectId ,
      projectName : projectName
    }
    history.push({
      pathname : "/configDetails" ,
      state : data
    })
  }

  return (
    <DashboardLayout>
      <div className="tabllle">
        <div className="tableHead">
          <img
            src={BackArrow}
            alt=""
            className="backArrow"
            onClick={() => history.goBack()}
          />
          <h2>PROJECTS</h2>
        </div>

        <div className="projectList">
          {map(deviceByProjectId, (devicesOfProject, projectId) => {
            const projectName = projects[projectId]?.name;
            console.log(projectName, "devicesOfProject");

            return (
              <><div className="projListItem" onClick={() => handleProjects(devicesOfProject ,projectId ,projectName)}>
                <h3>{projectName} - {projectId}</h3> 
                <img src={RightArrow} alt="" className="rightArrow"/>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};


export default AllDetails3;
