import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import * as exampleActions from '../../actions/exampleActions';

const actions = {
	...exampleActions
};

export default function ActionsProvider(Component) {
  @observer
  class ActionsProviderComponent extends Component {
    render() {
      return (
        <div id="actionsProvider">
          <Component {...this.props} actions2={actions} />
        </div>
      );
    }
  }

    return ActionsProviderComponent;
  }
