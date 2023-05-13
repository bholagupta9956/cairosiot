import { createSlice } from '@reduxjs/toolkit'
import { chain, keyBy, orderBy } from 'lodash';

import { makeGetRequest, makePostRequest } from '../middleware/axios';

import projectsMockResponse from '../mocks/projects.json';

import config from '../../config';

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: {},
    isLoading: true,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveProjectData: (state, action) => {
      state.isLoading = false
      state.projects = {
        ...state.projects,
        ...chain(action.payload).orderBy("projectId").keyBy("projectId").value()
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveProjectData } = projectsSlice.actions

export const fetchProjectsDetails = (companyId = null) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    const queryParams = {
      companyId
    }

    makeGetRequest(`${config.INVENSE_API_URL}/projects`, queryParams, options)
      .then(response => {
        dispatch(recieveProjectData(response.data));
      });
  }
};

export const fetchProjectsDetailsRealTime = (companyId = null) => {
  return dispatch => {
    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    const queryParams = {
      companyId
    }

    makeGetRequest(`${config.INVENSE_API_URL}/projects`, queryParams, options)
      .then(response => {
        dispatch(recieveProjectData(response.data));
      })
  }
};

export const fetchProjectDetails = (projectId) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/project/${projectId}`, null, options)
      .then(response => {
        dispatch(recieveProjectData(response.data));
      });
  }
};

export const fetchProjectDetailsRealTime = (projectId) => {
  const options = {
    mockEnabled: false,
    mockResponse: projectsMockResponse
  };

  return dispatch => {
    makeGetRequest(`${config.INVENSE_API_URL}/project/${projectId}`, null, options)
      .then(response => {
        dispatch(recieveProjectData(response.data));
      });
  }
};

export const addProject = (userId, attributes) => {
  return dispatch => {
    dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: {}
    };
    
    makePostRequest(`${config.INVENSE_API_URL_CORS}/project/`, null, attributes, options)
      .then(__response => {
        // dispatch(recieveDeviceData(response.data));
      });
  }
};

export const followProject = (email, project_id, role, permissions) => {
  return dispatch => {
    // dispatch(setLoading());
    const options = {
      mockEnabled: false,
      mockResponse: {}
    }

    makePostRequest(`${config.INVENSE_API_URL_CORS}/v2/user/project`, null, { email, project_id, role, permissions }, options)
      .then(response => {
        // dispatch(recieveDeviceData(response.data));
      });
  }
};

export default projectsSlice.reducer