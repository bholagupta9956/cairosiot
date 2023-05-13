import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom"
import { useSelector } from 'react-redux'
import { isEmpty } from "lodash"

import { getIsSuperAdmin } from "../helpers/auth"

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isLoading, details: userDetails } = useSelector((state) => state.currentUser);

  if (isLoading) {
    return <div>Please wait verifying .... </div>
  }

  const isSuperAdmin = getIsSuperAdmin(userDetails)

  return (
    <Route
      {...rest}
      render={props =>
        !isEmpty(userDetails) && isSuperAdmin ? (
          <Component userDetails={userDetails} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default AdminRoute
