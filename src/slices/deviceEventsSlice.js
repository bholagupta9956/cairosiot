import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit'

import { keyBy } from 'lodash';

import { parseInputTime, formatToInvenseTime } from '../helpers/time-utils';
import { makeGetRequest } from '../middleware/axios';

import config from '../../config';

export const deviceEventsSlice = createSlice({
  name: 'deviceEvents',
  initialState: {
    events: [],
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveDeviceEvents: (state, action) => {
      state.isLoading = false
      state.events = action.payload;
    }
  }
})

const { setLoading, recieveDeviceEvents } = deviceEventsSlice.actions

export const fetchDeviceEvents = (projectId, deviceId, startTime, endTime) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      // mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/project/${projectId}/device/${deviceId}/event`, {
      start_time: startTime,
      end_time: endTime
    }, options)
      .then(response => {
        dispatch(recieveDeviceEvents(response.data));
      });
  }
};


export const fetchDeviceEventsRealTime = (projectId, deviceId, startTime, endTime) => {
  return dispatch => {
    const options = {
      mockEnabled: false,
      // mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/project/${projectId}/device/${deviceId}/event`, {
      start_time: startTime,
      end_time: endTime
    }, options)
      .then(response => {
        dispatch(recieveDeviceEvents(response.data));
      });
  }
};

export default deviceEventsSlice.reducer