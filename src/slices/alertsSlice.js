import { createSlice } from '@reduxjs/toolkit'
import { groupBy } from 'lodash';


import {
  makeGetRequest,
} from '../middleware/axios';

import devicesMockResponse from '../mocks/devices.json';

import config from '../../config';

export const devicesSlice = createSlice({
  name: 'alerts',
  initialState: {
    alertsByDeviceId: {},
    alertsByProjectId: {},
    alertsByCompanyId: {},
    alerts: [],
    isLoading: true,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveAlertsData: (state, action) => {
      const alertsByDeviceId = groupBy(action.payload, 'deviceId')
      const alertsByProjectId = groupBy(action.payload, 'projectId')
      const alertsByCompanyId = groupBy(action.payload, 'companyId')
      const alerts = action.payload

      state.isLoading = false
      
      state.alertsByCompanyId = {
        ...state.alertsByCompanyId,
        ...alertsByCompanyId
      }

      state.alertsByProjectId = {
        ...state.alertsByProjectId,
        ...alertsByProjectId
      }

      state.alertsByDeviceId = alertsByDeviceId

      state.alerts = alerts
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveAlertsData } = devicesSlice.actions

export const getAlerts = (companyId, start_time, end_time) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/alerts`, { companyId, start_time, end_time }, options)
      .then(response => {
        dispatch(recieveAlertsData(response.data));
      });
  }
};

export const getAlertsByProject = (projectId, start_time, end_time) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/alerts`, { projectId, start_time, end_time }, options)
      .then(response => {
        dispatch(recieveAlertsData(response.data));
      });
  }
};

export const getAlertsByDevice = (deviceId, start_time, end_time) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/alerts`, { deviceId, start_time, end_time }, options)
      .then(response => {
        dispatch(recieveAlertsData(response.data));
      });
  }
};


export default devicesSlice.reducer