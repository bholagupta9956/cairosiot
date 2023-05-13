import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import devicesReducer from './slices/devicesSlice'
import deviceEventsReducer from './slices/deviceEventsSlice'
import settingsReducer from './slices/settingsSlice'
import projectsReducer from './slices/projectsSlice'
import companiesReducer from './slices/companiesSlice'
import usersReducer from './slices/usersSlice'
import addDeviceReducer from './slices/addDeviceWizardSlice'
import editDeviceReducer from './slices/editDeviceSlice'
import alertsReducer from './slices/alertsSlice'
import currentUserReducer from './slices/currentUserSlice'


const combinedReducer = combineReducers({
  counter: counterReducer,
  devicesDetails: devicesReducer,
  deviceEvents: deviceEventsReducer,
  settings: settingsReducer,
  projects: projectsReducer,
  companies: companiesReducer,
  users: usersReducer,
  alerts: alertsReducer,
  addDevice: addDeviceReducer,
  editDevice: editDeviceReducer,
  currentUser: currentUserReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'currentUser/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer
});