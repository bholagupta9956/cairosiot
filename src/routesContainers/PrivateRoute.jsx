import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom"
import { useSelector } from 'react-redux'
import { isEmpty } from "lodash"

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const { isLoading, details: userDetails } = useSelector((state) => state.currentUser);

  if (isLoading) {
    return <div>Please wait verifying .... </div>
  }

  return (
    <Route 
      {...rest}
      render={props =>
        !isEmpty(userDetails) ? (
          <Component userDetails={userDetails} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
