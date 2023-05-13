import { createSlice } from '@reduxjs/toolkit'

import { makeGetRequest } from '../middleware/axios'
import Pool from '../helpers/user-pool'

import projectsMockResponse from '../mocks/projects.json';

import config from '../../config';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    details: JSON.parse(localStorage.getItem('currentUserDetails')),
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = false
    },
    recieveCurrentUserData: (state, action) => {
      state.isLoading = false
      localStorage.setItem('currentUserDetails', JSON.stringify(action.payload)) 
      state.details = action.payload
    },
    logout: (state, action) => {
      state.isLoading = false
      localStorage.removeItem('currentUserDetails')
      state.details = null
      Pool.getCurrentUser()?.signOut()
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveCurrentUserData, logout } = currentUserSlice.actions

export const getAndSaveUser = (userDetails, callback) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: projectsMockResponse
    };

    makeGetRequest(`${config.INVENSE_API_URL}/user/${userDetails.sub}`, null, options)
      .then(response => {
        const userDetails = response.data[0];

        dispatch(recieveCurrentUserData({ ...userDetails, ...response.data[0] }));
        callback()
        // dispatch(recieveUserData(response.data));
      });
  }
}

export default currentUserSlice.reducer