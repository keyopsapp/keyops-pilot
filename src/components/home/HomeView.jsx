import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {Button, Grid, Typography, Toolbar} from 'material-ui'
import Icon from 'material-ui/Icon';
import {withRouter} from 'react-router-dom';

import {grey, green, yellow, pink} from 'material-ui/colors'

import {withStyles} from 'material-ui/styles';

import Card, {CardContent, CardActions} from 'material-ui/Card';

const styles = theme => ({
    link: {
        color: pink[500] + '!important'
    },
    addButton: {
        color: '#FFFFFF'
    },
    cardContnet: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1

    },
    card: {
        minWidth: 275,
        display: 'flex',
        position: 'relative'
    },

    button: {
        position: 'relative',
        height: '100%',
        margin: 0,

    },
    cardActions: {
        position: 'relative',
        // flex: 1,
        height: 'auto',
        justifyContent: 'flex-end',
        padding: 0

    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    toolbar: {
        marginBottom: 16,
        // fontSize: 14,
        // flex:1,
        // color: theme.palette.text.secondary,
    },
    mainTitle: {
        // marginBottom: 16,
        // fontSize: 14,
        flex: 1,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    statusBar: {
        '&.draft': {
            backgroundColor: grey[500]
        },
        '&.completed': {
            backgroundColor: green['A200']
        },
        '&.running': {
            backgroundColor: green['A200']
        },
        // position: 'absolute',
        // backgroundColor: 'red',
        width: 5,
        // height: 5
    }

});


@observer
class HomeView extends Component {


    componentDidMount() {

        this.props.actions2.getSurveys();
    }


    createSurvey() {
        const {actions2, history} = this.props;

        actions2.createSurvey()
            .then(survey => this.goTo('edit', survey.Id))
    }

    goTo(pathname, id) {
        const {history} = this.props;
        history.push(`/${pathname}/${id}`);
    }


    startSurvey(survey) {

        const {actions2, showMessage, showLink, surveyStore} = this.props;
        // const updated = {...survey, status: 'running'};
        // console.log(updated)


        actions2.startSurvey(survey.Id)
            .then(() => {
                const msg = <span> Survey is live. <a className={this.props.classes.link}
                                                      href={`/display/${survey.Id}/${survey.PostId}/{userid}`}>Click here</a> to access it.</span>
                showMessage(msg);
            })
            .catch(() => showMessage('Please add some questions to the survey first.'));
    }


    render() {
        const {surveyStore, classes} = this.props;


        const cards = surveyStore.surveys.map(survey => {

            return (


                <Card key={survey.Id} className={classes.card}>
                    <div className={`${classes.statusBar} ${survey.IsPublished ? 'running' : 'draft'}`}>

                    </div>
                    <CardContent className={classes.cardContnet}>


                        <div>

                            {/*<Typography className={classes.title}>Created: 12/11/2017</Typography>*/}
                            <Typography type="headline" component="h2">
                                {survey.Name}
                            </Typography>
                            <Typography className={classes.pos}>Created: {new Intl.DateTimeFormat('en-GB', {
                                // year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            }).format(new Date(survey.CreatedAt))}</Typography>
                        </div>
                        {/*<div className={classes.info}>*/}
                        {/*<Typography type="subheading" component="h3">*/}
                        {/*Responses: 3/10 (30%)*/}
                        {/*</Typography>*/}

                        {/*</div>*/}

                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Button className={classes.button}
                                disabled={survey.IsPublished}
                                onClick={() => this.startSurvey(survey)}>
                            Start
                            <Icon className={classes.rightIcon}>play_arrow</Icon>
                        </Button>
                        <Button className={classes.button}
                                disabled={survey.IsPublished}
                                onClick={() => this.goTo('edit', survey.Id)}>
                            Edit
                            <Icon className={classes.rightIcon}>edit</Icon>
                        </Button>
                        <Button className={classes.button}
                                disabled={!survey.IsPublished}
                                onClick={() => this.goTo('results', survey.Id)}>


                            Results
                            <Icon className={classes.rightIcon}>equalizer</Icon>
                        </Button>
                    </CardActions>

                </Card>




            );


        });


        return (



            <div>
                <Grid container
                      spacing={24}

                      justify="center">
                    <Grid item xs={6}>

                        <Toolbar className={classes.toolbar}>
                            <Typography type="title" className={classes.mainTitle}>My Surveys</Typography>
                            <Button fab color="accent" className={classes.addButton} aria-label="add"
                                    onClick={this.createSurvey.bind(this)}>
                                <Icon>add</Icon>
                            </Button>

                        </Toolbar>
                        <div className="cards-list">
                            {cards}
                        </div>

                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(withRouter(HomeView));
