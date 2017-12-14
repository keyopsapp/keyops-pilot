import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import {AppBar, Typography, Toolbar, Grid} from 'material-ui'

@observer
export default class Navigation extends Component {
    render() {
        return (


            <AppBar>
                <Toolbar>
                    <Typography type="title" color="inherit">
                        KeyOps
                    </Typography>
                </Toolbar>
            </AppBar>




        );
    }
}
