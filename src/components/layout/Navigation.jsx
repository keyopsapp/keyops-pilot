import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import {AppBar, Toolbar, Icon, IconButton, Badge, Button} from 'material-ui'
import logo from '../../assets/logo.png';
import ferringLogo from '../../assets/ferring_logo.svg';
import {observe} from 'mobx';

import {withStyles} from 'material-ui/styles';
import StoreInjector from '../middleware/StoreInjector';

import {withRouter} from 'react-router-dom';

const styles = theme => {
    console.log(theme.palette);
    // console.log('asdas')
    return {
        title: {
            ...theme.typography.title, textDecoration: 'none', color: 'white', overflow: 'hidden', height: 64, flex: 1,
            '&:hover': {...theme.typography.title, textDecoration: 'none', color: 'white'}
        },
        logo: {
            height: 120,
            'margin-top': -27
        },
        ferringLogo: {
            height: 45,
            'margin-top': 10
        },
        appBar: {
            borderBottom: 'solid #EAEAEA 1px',
            color: '#EAEAEA'
        },
        badge: {
            top: 10
        },
        moneyAnimation: {
            position: 'absolute',
            transform: 'scale(5, 5)',
            right: '50%',
            top: '200px',
            opacity: 0,
            pointerEvents:'none',

            '&.animate': {
                right: 22,
                top: 19,
                opacity: 1,
                transform: 'scale(1, 1)',
                transition: 'right 300ms, top 300ms, opacity 200ms, transform 300ms'
            }
        }

    }

};


@StoreInjector
@observer
class Navigation extends Component {


    state = {animateBadge: false, amount: 0};

    addMoney(change) {
        this.setState({animateBadge: true});
        setTimeout(() => this.setState({animateBadge: false, amount: change}), 300);
    }


    componentWillReact() {
        this.setState({
            isDisplay: location.pathname.indexOf('display') > -1,
            isResults: location.pathname.indexOf('results') > -1
        })
    }

    componentWillMount() {

        const {surveyStore, location} = this.props;
        this.disposer = observe(surveyStore.current, (change) => {
            this.addMoney(change.newValue);
            // console.log(change)
        });
        this.setState({
            isDisplay: location.pathname.indexOf('display') > -1,
            isResults: location.pathname.indexOf('results') > -1
        })


        // setInterval(() => surveyStore.addAmount(100), 5000)


    }

    componentWillUnmount() {
        this.disposer();
    }

    render() {

        const {classes, surveyStore, location} = this.props;

        const surveyId = location.pathname.split('/')[2]

        let icon;
        if (this.state.isDisplay) {
            icon = <Badge className={classes.badge} badgeContent={this.state.amount}
                          color="accent">
                <Icon style={{fontSize: 36, top: -5, position: 'relative', color: '#1ab394'}}>monetization_on</Icon>
            </Badge>
        }
        else {
            icon = <Icon style={{fontSize: 36, position: 'relative'}}>account_circle</Icon>
        }


        return (


            <AppBar className={classes.appBar} elevation={0}>
                <Icon style={{fontSize: 36, color: '#1ab394'}}
                      className={[classes.moneyAnimation].concat(this.state.animateBadge ? 'animate' : '').join(' ')}>
                    monetization_on </Icon>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <Icon style={{fontSize: 36}}>menu</Icon>
                    </IconButton>
                    {/*<Typography type="title" color="inherit">*/}
                    <Link to='/' className={classes.title} disabled={this.state.isDisplay}>
                        {/*KeyOps*/}
                        {this.state.isDisplay ?
                            <img src={logo} height={64} className={classes.logo}/> :
                            <img src={ferringLogo} height={50} className={classes.ferringLogo}/>}

                    </Link>
                    {/*</Typography>*/}

                    {!this.state.isDisplay && <span className="main-title">
                        <img src={logo} height={20} className={classes.logo}/> <span>Pilot Summer 2018</span>
                    </span>}


                    {this.state.isResults &&

                    <Button href={`https://dxsurvey.com/Results/ExportResults/${surveyId}?format=csv`}>
                        <Icon style={{fontSize: 20, color: 'black'}}>file_download</Icon>
                        <span style={{color: 'black'}}>Export</span>
                    </Button>}

                    <IconButton color="inherit" aria-label="Menu">
                        {icon}
                    </IconButton>


                </Toolbar>
            </AppBar>




        );
    }
}

export default withStyles(styles)(withRouter(Navigation))