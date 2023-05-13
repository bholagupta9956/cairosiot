import React, { useReducer } from "react";
import { map } from 'lodash';
import Button from '../standard/Button.jsx'
import Card from '../standard/Card.jsx'
import Input from '../standard/Input.jsx'
import { Table, TableRow, TableHeader, TableData } from '../standard/Table.jsx';

const initialState = {
  email: '',
  role: 'admin',
  errors: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'update-email':
        return { ...state, email: action.value };
    case 'update-role':
        return { ...state, role: action.value };
    case 'update-error':
        return { ...state, errors: action.value };
    default:
      throw new Error();
  }
}

const permissionsByUserType = {
  'admin': ['add_device', 'add_users', 'depricate_device', 'view_events'],
  'reporter': ['view_events']
}

const MembersPermission = props => {

  const [state, reducerDispatch] = useReducer(reducer, initialState)

  const { usersList, onInvite } = props;

  const handleSubmit = e => {
    e.preventDefault()
    const permissions = permissionsByUserType[state.role] || []

    onInvite(state.email, state.role, permissions)
  }

  return (
    <>
      <div className="my-4">
        <Card>
          <div className="text-subHeading text-dark font-bold">Invite Members</div>
            <form
              className="my-4 grid gap-4 grid-cols-1"
              onSubmit={handleSubmit}
            >
                <div>
                    <Input
                        value={state.email}
                        type="text"
                        label="UserId/Email"
                        onChange={e => reducerDispatch({ type: 'update-email', value: e.target.value })}
                    />
                </div>
                <div>
                    <select
                      value={state.role}
                      className="block px-3 py-2 w-full bg-background rounded outline-none"
                      onChange={e => reducerDispatch({ type: 'update-role', value: e.target.value })}
                    >
                      <option value="admin">Project Admin</option>
                      <option value="reporter">Reporter</option>
                    </select>
                </div>
                <div className="self-end">
                    <Button isFullWidth={false} label="Invite User" type="submit" style={{ minWidth: 200 }} />
                </div>
            </form>
        </Card>
      </div>
      <div className="my-4">
        <Table heading="Project Members">
          <TableRow>
            <TableHeader>
              <div className="px-4 py-2 text-left">
                Email
              </div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">
                Permissions
              </div>
            </TableHeader>
            <TableHeader>
              <div className="px-4 py-2 text-left">
                Actions
              </div>
            </TableHeader>
          </TableRow>
          {
            map(usersList, user => {
              return (
                <TableRow>
                  <TableData>
                    <div className="px-4 py-2 text-left text-medium">
                      {user.email}
                    </div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left" style={{ maxWidth: 200 }}>
                      {
                        map(user.permissions, permission => {
                          return <div className="bg-primary text-white px-2 m-1 rounded">{permission}</div>
                        })
                      }
                    </div>
                  </TableData>
                  <TableData>
                    <div className="px-4 py-2 text-left">
                      <Button
                        isOutline
                        isDanger
                        isFullWidth={false}
                        label="Revoke permission"
                      />
                    </div>
                  </TableData>
                </TableRow>
              )
            })
          }
        </Table>
      </div>
    </>
  );
}

export default MembersPermission;
