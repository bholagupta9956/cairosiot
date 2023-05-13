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


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});


function Row(props) {
  const { name, devicesOfProject, projectId } = props;

  const [projectOpen, setProjectOpen] = useState("");
  const [deviceOpen, setDeviceOpen] = useState("");
  const [modeOpen, setModeOpen] = useState("");
  const classes  = useRowStyles("");
  const handleProjectOpen = (name) => {
    if (projectOpen === name) {
      setProjectOpen("");
    } else {
      setProjectOpen(name);
    }
  };

  const handleDeviceOpen = (deviceName) => {
    if (deviceOpen === deviceName) {
      setDeviceOpen("");
    } else {
      setDeviceOpen(deviceName);
    }
  };

  const handleModeOpen = (modeDetails) => {
    if (modeOpen === modeDetails.modeName) {
      setModeOpen("");
    } else {
      setModeOpen(modeDetails.modeName);
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleProjectOpen(name)}
          >
            {projectOpen === name ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name} - {projectId}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={projectOpen === name} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="device">Device </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {/* here we are going to render all the devices  */}

                  {map(devicesOfProject, (device, id) => {
                    console.log(device ,'all devicess ')
                    return (
                      <>
                        <TableRow className={classes.root}>
                          <TableCell className="deviceArrow">
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => {
                                handleDeviceOpen(device.name);
                              }}
                            >
                              {deviceOpen === device.name ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className="deviceDta"
                          >
                            {device.name} - {device.deviceId}
                          </TableCell>
                        </TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={deviceOpen === device.name}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="mode">
                                      Mode{" "}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {/* here we are going to show the mode data */}
                                  {map(
                                    device.latestDataByModeId,
                                    (modeDetails, modeId) => {
                                      
                                      return (
                                        <>
                                          <TableRow className={classes.root}>
                                            <TableCell className="modeArrow">
                                              <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() =>
                                                  handleModeOpen(modeDetails)
                                                }
                                              >
                                                {modeOpen ===
                                                modeDetails.modeName ? (
                                                  <KeyboardArrowUpIcon />
                                                ) : (
                                                  <KeyboardArrowDownIcon />
                                                )}
                                              </IconButton>
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              className="modeDta"
                                            >
                                              {modeDetails.modeName} -{" "}
                                              {modeDetails.modeValue} -{" "}
                                              {modeDetails.modeId}
                                            </TableCell>
                                          </TableRow>
                                          <TableCell
                                            style={{
                                              paddingBottom: 0,
                                              paddingTop: 0,
                                            }}
                                            colSpan={6}
                                          >
                                            <Collapse
                                              in={
                                                modeOpen ===
                                                modeDetails.modeName
                                              }
                                              timeout="auto"
                                              unmountOnExit
                                            >
                                              <Box margin={1}>
                                                <Table
                                                  size="small"
                                                  aria-label="purchases"
                                                >
                                                  <TableHead>
                                                    <TableRow className="params">
                                                      <TableCell className="params">
                                                        Params{" "}
                                                      </TableCell>
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    {/* here we are showing parameters  */}
                                                    {map(
                                                      modeDetails.parameters,
                                                      (parameter, index) => {
                                                        return (
                                                          <>
                                                            <TableRow
                                                              className={
                                                                classes.root
                                                              }
                                                            >
                                                              <TableCell></TableCell>
                                                              <TableCell
                                                                component="th"
                                                                scope="row"
                                                                className="paramsDta"
                                                              >
                                                                {parameter.name}{" "}
                                                                -{" "}
                                                                {parameter.key}
                                                              </TableCell>
                                                            </TableRow>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </TableBody>
                                                </Table>
                                              </Box>
                                            </Collapse>
                                          </TableCell>
                                        </>
                                      );
                                    }
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const AllDetails2 = (props) => {
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
  const history = useHistory();

  const results = searchFilter(values(projects), ["name"], searchQuery);
  const isSuperAdmin = getIsSuperAdmin(userDetails);

  const deviceByProjectId = groupBy(devicesById, "projectId");

  return (
    <>
      <DashboardLayout>
        <div className="tabllle">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Projects </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {map(deviceByProjectId, (devicesOfProject, projectId) => {
                  const projectName = projects[projectId]?.name;

                  return (
                    <>
                      <Row
                        name={projectName}
                        devicesOfProject={devicesOfProject}
                        projectId={projectId}
                      />
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AllDetails2;
