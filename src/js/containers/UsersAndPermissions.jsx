import React, { useEffect, useReducer } from "react";
import {
  useHistory,
  generatePath 
} from 'react-router-dom';
import { map, size, reduce, values, isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux'

import { fetchUsers, assignUserToCompany } from '../../slices/usersSlice.js';
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


const UsersAndPermissions = props => {
  const { userDetails } = props;
  const { isLoading: isUsersLoading, users } = useSelector((state) => state.users);
  const { isLoading: isCompaniesLoading, companies } = useSelector((state) => state.companies);

  const dispatch = useDispatch()
  const history = useHistory();
  
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchAllCompanies())
  }, []);

  const initialState = {
    userId: null,
    companyId: null,
    role: 'admin',
    errors: null
  };

  const [state, reducerDispatch] = useReducer(reducer, initialState)

  if(isUsersLoading || isCompaniesLoading) {
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

  if (isEmpty(users)) {
    return (
      <DashboardLayout>
        <div className="p-4 border-1">
          You dont have any users
        </div>
      </DashboardLayout>
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(assignUserToCompany(state))
  }

  return (
    <DashboardLayout>
      <div className="my-4">
        <Card>
          <div className="text-subHeading text-dark font-bold">Invite Users</div>
            <form
              className="my-4 grid gap-4 grid-cols-1"
              onSubmit={handleSubmit}
            >
              <div>
                  <label>User Email</label>
                  <select
                    value={state.userId}
                    className="block px-3 py-2 w-full bg-background rounded outline-none"
                    onChange={e => reducerDispatch({ type: 'update-userId', value: e.target.value })}
                  >
                    <option disabled selected value> -- select an user -- </option>
                    {
                      map(users, (user, userId) => {
                        return <option value={userId}>{user.email}</option>
                      })
                    }
                  </select>
              </div>
              <div>
                  <label>Company</label>
                  <select
                    value={state.companyId}
                    className="block px-3 py-2 w-full bg-background rounded outline-none"
                    onChange={e => reducerDispatch({ type: 'update-companyId', value: e.target.value })}
                  >
                    <option disabled selected value> -- select an company -- </option>
                    {
                      map(companies, (company, companyId) => {
                        return <option value={companyId}>{company.name}</option>
                      })
                    }
                  </select>
              </div>
              <div>
                  <label>Role</label>
                  <select
                    value={state.role}
                    className="block px-3 py-2 w-full bg-background rounded outline-none"
                    onChange={e => reducerDispatch({ type: 'update-role', value: e.target.value })}
                  >
                    <option disabled selected value> -- select an option -- </option>
                    <option value="admin">Project Admin</option>
                    <option value="reporter">Reporter</option>
                  </select>
              </div>
              <div className="self-end">
                  <Button isFullWidth={false} label="Save" type="submit" style={{ minWidth: 200 }} />
              </div>
            </form>
        </Card>
      </div>
      <div className="my-4">
        <Table heading="Users & Permissions">
          <TableRow>
            <TableHeader>
              <div className="px-4 py-2 text-left">User</div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">Email</div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">Company</div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">Role</div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">Actions</div>
            </TableHeader>
          </TableRow>
          {
            map(users, (user, userId) => {
              return (
                <TableRow key={userId}>
                  <TableData>
                    <div className="px-4 py-2 text-left">{user.name}</div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">{user.email}</div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">{companies[user.companyId]? companies[user.companyId].name : 'Unassigned' }</div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">{user.role}</div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">
                      <Button
                        isDanger
                        isFullWidth={false}
                        label="Revoke Permission"
                      />
                    </div>
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

export default UsersAndPermissions;