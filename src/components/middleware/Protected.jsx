import React, { Component } from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

export default function Protected(Component) {
  @observer
  class AuthenticatedComponent extends Component {
    render() {
      const { isAuthenticated, isAuthenticating } = this.props.authStore;

      return (
        <div id="protected">
          {isAuthenticated ? (
            <Component {...this.props} />
          ) : !isAuthenticating && !isAuthenticated ? (
            <Redirect to={{ pathname: "/" }} />
          ) : null}
        </div>
      );
    }
  }

    return AuthenticatedComponent;
  }
