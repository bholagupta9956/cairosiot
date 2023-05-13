import { createSlice } from '@reduxjs/toolkit'
import { chain } from 'lodash';

import { makeGetRequest, makePutRequest } from '../middleware/axios'

import projectsMockResponse from '../mocks/projects.json';

import config from '../../config';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    isLoading: true,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveUserData: (state, action) => {
      state.isLoading = false
      state.users = {
        ...state.users,
        ...chain(action.payload).filter(u => u["custom:role"] != "superadmin").keyBy('userId').value()
      }
    },
    logout: (state, action) => {
      state.isLoading = false
      state.users = {}
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveUserData, logout } = usersSlice.actions

export const fetchUsers = () => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/users`, null, options)
      .then(response => {
        dispatch(recieveUserData(response.data));
      });
  }
};


export const assignUserToCompany = (attributes) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    makePutRequest(`${config.INVENSE_API_URL}/v2/user`, null, attributes, options)
      .then(response => {
        dispatch(recieveUserData([response.data.Attributes]));
      });
  }
};


export const getAndSaveUser = (userId, callback) => {
  return dispatch => {
    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/user/${userId}`, null, options)
      .then(response => {
        const userDetails = response.data[0];
        localStorage.setItem('currentUserDetails', JSON.stringify(userDetails))
        callback()
        // dispatch(recieveUserData(response.data));
      });
  }
}

export default usersSlice.reducer