import { createSlice } from '@reduxjs/toolkit'
import { groupBy, keyBy, values, merge, mapValues } from 'lodash';
import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest
} from '../middleware/axios';
import devicesMockResponse from '../mocks/devices.json';
import { deviceModes } from '../mocks/deviceModes';
import { mergeParameters } from '../helpers/utils';

import config from '../../config';

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: {},
    devicesByProjectId: {},
    isLoading: true,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveDeviceData: (state, action) => {
      const devicesDataById = keyBy(action.payload, 'deviceId');
      const devicesData = mapValues(devicesDataById, deviceData => {
        const latestDataByModeId = mergeParameters(deviceData.prametersByModeId, deviceData.latestDataByModeId);
        return {
          ...deviceData,
          latestDataByModeId,
        }
      });
      state.isLoading = false
      state.devices = {
        ...state.devices,
        ...devicesData
      }
      state.devicesByProjectId = groupBy(state.devices, 'projectId')
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveDeviceData } = devicesSlice.actions

export const fetchDevicesDetails = (projectId) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/project/${projectId}/devices`, null, options)
      .then(response => {
        dispatch(recieveDeviceData(response.data));
      });
  }
};

export const fetchDevicesDetailsRealTime = (projectId) => {
  return dispatch => {
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/project/${projectId}/devices`, null, options)
      .then(response => {
        dispatch(recieveDeviceData(response.data));
      });
  }
};

export const fetchDeviceDetails = (projectId, deviceId) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v2/project/${projectId}/device/${deviceId}`, null, options)
      .then(response => {
        dispatch(recieveDeviceData(response.data));
      });
  }
};

export const fetchDeviceDetailsRealTime = (projectId, deviceId) => {
  const options = {
    mockEnabled: false,
    mockResponse: devicesMockResponse
  };

  return dispatch => {
    makeGetRequest(`${config.INVENSE_API_URL}/v2/project/${projectId}/device/${deviceId}`, null, options)
      .then(response => {
        dispatch(recieveDeviceData(response.data));
      });
  }
};

export const fetchDevicesDetailsUniversal = (params) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/v3/devices`, params, options)
      .then(response => {
        dispatch(recieveDeviceData(response.data));
      });
  }
};

export const addDevice = (projectId, attributes) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };
    const requestBody = {
      ...attributes,
      deviceModes: deviceModes[attributes.deviceType]
    };
    
    makePostRequest(`${config.INVENSE_API_URL_CORS}/v2/project/${projectId}/device`, null, requestBody, options)
      .then(response => {
        // dispatch(recieveDeviceData(response.data));
      });
  }
};

export const deprecateDevice = (projectId, deviceId) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };
    const attributes = {
      isDeprecated: true
    }
    makePutRequest(`${config.INVENSE_API_URL_CORS}/project/${projectId}/device/${deviceId}`, null, attributes, options)
      .then(response => {
        // dispatch(recieveDeviceData(response.data));
      });
  }
}

export const deleteDevice = (projectId, deviceId, callback = null) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: devicesMockResponse
    };
    const attributes = {
      isDeprecated: true
    }
    makeDeleteRequest(`${config.INVENSE_API_URL_CORS}/project/${projectId}/device/${deviceId}`, null, attributes, options)
      .then(__response => {
        callback()
        // dispatch(recieveDeviceData(response.data));
      });
  }
};


export default devicesSlice.reducer