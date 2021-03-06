import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenticated} from '../components/auth';

const PrivateRoute=({ component:Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated()? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                // state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };

  export default PrivateRoute;