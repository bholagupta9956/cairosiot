import React, { useEffect, useReducer } from "react";
import {
  useHistory,
  generatePath 
} from 'react-router-dom';
import { map, size, reduce, values, isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux'

// import { fetchUsers, assignUserToCompany } from '../../slices/usersSlice.js';
import { fetchAllCompanies } from '../../slices/companiesSlice.js'

import Skeleton from 'react-loading-skeleton';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import Button from "../components/standard/Button.jsx";
import Maps from '../components/standard/Map.jsx';
import Card from '../components/standard/Card.jsx';
import Input from '../components/standard/Input.jsx';
import { Table, TableRow, TableHeader, TableData } from '../components/standard/Table.jsx';

import { searchFilter } from "../../helpers/utils"
import { getIsSuperAdmin } from '../../helpers/auth'


function reducer(state, action) {
  switch (action.type) {
    case 'update-userId':
        return { ...state, userId: action.value };
    case 'update-companyId':
        return { ...state, companyId: action.value };
    case 'update-role':
      return { ...state, role: action.value };
    case 'update-error':
        return { ...state, errors: action.value };
    default:
      throw new Error();
  }
}


const Companies = props => {
  const { userDetails } = props;
  // const { isLoading: isUsersLoading, users } = useSelector((state) => state.users);
  const { isLoading: isCompaniesLoading, companies } = useSelector((state) => state.companies);

  const dispatch = useDispatch()
  const history = useHistory();
  
  useEffect(() => {
    // dispatch(fetchUsers())
    dispatch(fetchAllCompanies())
  }, []);

  const initialState = {
    userId: null,
    companyId: null,
    role: 'admin',
    errors: null
  };

  const [state, reducerDispatch] = useReducer(reducer, initialState)

  if(isCompaniesLoading) {
    return (
      <DashboardLayout>
        <Skeleton height="60vh" />
        <div className="my-4">
          <Skeleton height="5vh" />
          <Skeleton height="20vh" />
          <Skeleton height="20vh" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="my-4">
        <Table heading="Companies">
          <TableRow>
            <TableHeader>
              <div className="px-4 py-2 text-left">Company Name</div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">Company ID</div>
            </TableHeader>
          </TableRow>
          {
            map(companies, (company, userId) => {
              return (
                <TableRow key={userId}>
                  <TableData>
                    <div className="px-4 py-2 text-left">{company.name}</div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">{company.companyId}</div>
                  </TableData>
                </TableRow>
                )
              })
          }
        </Table>
      </div>
    </DashboardLayout>
  );
}

export default Companies;