import React from "react"
import {
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import PublicRoute from './routesContainers/PublicRoute.jsx'
import PrivateRoute from './routesContainers/PrivateRoute.jsx'
import AdminRoute from './routesContainers/AdminRoute.jsx'
import ProjectDashboard from './js/containers/ProjectDashboard.jsx';
import Projects from './js/containers/Projects.jsx';
import DeviceDetails from './js/containers/DeviceDetails.jsx'
import AddDevice from './js/containers/AddDevice.jsx'
import Login from './js/containers/Login.jsx'
import Signup from "./js/containers/Signup.jsx"
import Settings from './js/containers/Settings.jsx'
import AddProject from './js/containers/AddProject.jsx';
import AddCompany from './js/containers/AddCompany.jsx';
import AddDeviceWizard from './js/containers/AddDeviceWizard.jsx';
import UsersAndPermissions from './js/containers/UsersAndPermissions.jsx';
import Companies from './js/containers/Companies.jsx';
import AllDetails from './js/containers/AllDetails.jsx';
import Projects2 from "./js/containers/Projects2.jsx";
import ProjectDashboard2 from "./js/containers/ProjectDashboard2.jsx";
import AllDetails2 from "./js/containers/AllDetails2.jsx";
import AllDetails3 from "./js/containers/AllDetails3.jsx";
import ConfigDetails from "./js/containers/ConfigDetails.jsx";


const Routes = () => {

  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/settings" component={Settings} />
        <AdminRoute path="/addProject" component={AddProject} />
        <AdminRoute path="/addCompany" component={AddCompany} />
        <AdminRoute path="/companies" component={Companies} />
        <AdminRoute path="/users" component={UsersAndPermissions} />
        {/* <AdminRoute path="/config" component={AllDetails2} /> */}
        <AdminRoute path="/config" component={AllDetails3} />
        <AdminRoute path="/configDetails" component={ConfigDetails}/>
        <PrivateRoute path="/:projectId/device/:deviceId" component={DeviceDetails} />
        <PrivateRoute path="/:projectId/addDevice" component={AddDevice} />
        <PrivateRoute path="/:projectId/addDeviceWizard" component={AddDeviceWizard} />
        <PrivateRoute path="/:projectId" component={ProjectDashboard2} />
        <PrivateRoute path="/" component={Projects2} />
      </Switch>
    </Router>
  )
};

export default Routes ;

