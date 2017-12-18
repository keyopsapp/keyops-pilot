import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import {AppBar, Toolbar} from 'material-ui'

import {withStyles} from 'material-ui/styles';

const styles = theme => {
    console.log(theme.palette);
    // console.log('asdas')
    return {
        title: {
            ...theme.typography.title, textDecoration: 'none', color: 'white',
            '&:hover': {...theme.typography.title, textDecoration: 'none', color: 'white'}
        }

    }

};


@observer
class Navigation extends Component {


    render() {

        const {classes} = this.props;


        return (


            <AppBar>
                <Toolbar>
                    {/*<Typography type="title" color="inherit">*/}
                    <Link to='/' className={classes.title}>
                        KeyOps
                    </Link>
                    {/*</Typography>*/}
                </Toolbar>
            </AppBar>




        );
    }
}

export default withStyles(styles)(Navigation)