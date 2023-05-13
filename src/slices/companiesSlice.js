import { createSlice } from '@reduxjs/toolkit'
import { chain, keyBy, orderBy } from 'lodash';

import { makeGetRequest, makePostRequest } from '../middleware/axios';

import companiesMockResponse from '../mocks/projects.json';

import config from '../../config';

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    companies: {},
    isLoading: true,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    recieveCompanyData: (state, action) => {
      state.isLoading = false
      state.companies = {
        ...state.companies,
        ...chain(action.payload).orderBy("companyId").keyBy("companyId").value()
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, recieveCompanyData } = companiesSlice.actions

export const addNewCompany = (attributes) => {
  return dispatch => {
    dispatch(setLoading());

    const options = {
      mockEnabled: false,
      mockResponse: companiesMockResponse
    }
        
    makePostRequest(`${config.INVENSE_API_URL_CORS}/company/`, null, attributes, options)
      .then(__response => {
        // dispatch(recieveDeviceData(response.data));
      })
  }
};

export const fetchAllCompanies = () => {
  return dispatch => {
    const options = {
      mockEnabled: false,
      mockResponse: companiesMockResponse
    }

    makeGetRequest(`${config.INVENSE_API_URL}/companies`, null, options)
      .then(response => {
        dispatch(recieveCompanyData(response.data));
      });
  }
}


export default companiesSlice.reducer