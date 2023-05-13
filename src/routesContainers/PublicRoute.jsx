import React, { useEffect, useState, useContext } from "react"
import {
  Route,
  Redirect
} from "react-router-dom"
import { isEmpty } from "lodash"
import { useSelector } from 'react-redux'

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isLoading, details: userDetails } = useSelector((state) => state.currentUser);
  
  if (isLoading) {
    return <div>Please wait verifying .... </div>
  }

  return (
    <Route
      {...rest}
      render={props =>
        isEmpty(userDetails) ? (
          <Component {...props} />
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

export default PublicRoute
