import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import * as exampleActions from '../../actions/exampleActions';
import * as surveyActions from '../../actions/surveyActions';
import {Button, Icon, IconButton, Snackbar, Typography} from "material-ui";

const actions = {
    ...surveyActions
};


export default function ActionsProvider(Component) {
    @observer
    class ActionsProviderComponent extends Component {

        state = {open: false, msg: ''}
        extraActions = [];

        showMessage(msg) {
            this.setState({open: true, msg: msg});
        }




        render() {
            return (


                <div id="actionsProvider">
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={() => this.setState({open: false})}
                        message={this.state.msg}
                        action={[


                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                // className={classes.close}
                                onClick={() => this.setState({open: false})}
                            >
                                <Icon color="accent">close</Icon>
                            </IconButton>,
                        ]}
                    />

                    <Component {...this.props} actions2={actions} showMessage={msg => {
                        this.showMessage(msg);
                    }}/>
                </div>
            );
        }
    }

    return ActionsProviderComponent;
}
