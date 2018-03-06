import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {Button, Grid, Typography, Toolbar, CircularProgress} from 'material-ui'
import Icon from 'material-ui/Icon';
import {withRouter} from 'react-router-dom';

import {grey, green, yellow, pink} from 'material-ui/colors'

import {withStyles} from 'material-ui/styles';

import Card, {CardContent, CardActions} from 'material-ui/Card';
import ConfirmationDialog from "./ConfirmationDialog";

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
        position: 'relative',
        cursor: 'pointer',
        '&.selected': {
            backgroundColor: '#fafafa',
            boxShadow: 'inset 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
        }
    },

    button: {
        position: 'relative',
        height: '100%',
        margin: 0,
        '&[disabled][name=start-btn]': {
            color: green['A200']
        }

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
        paddingRight: 130
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
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    infoCard: {
        marginBottom: 20,
        backgroundColor: '#f1f1f1',

    },
    infoCardContent: {
        display: 'flex',
    },
    infoCardValue: {
        marginRight: 20,
        '& $p': {
            marginBottom: 10
        }
    },
    sidebar: {
        top: 90,
        position: 'sticky'
    },
    progress: {
        marginLeft: 130,
    }

});


@observer
class HomeView extends Component {

    state = {};

    componentDidMount() {

        this.props.actions2.getSurveys();
    }

    handleClose = value => {
        this.setState({value, open: false});
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


    publishSurvey = (groupId) => {
        this.setState({open: false});

        const {actions2, showMessage, showLink, surveyStore} = this.props;
        const survey = this.state.survey;

        actions2.startSurvey(survey.Id, survey.PostId, survey.Name, groupId)
            .then(() => {
                const msg = <span> Survey is live. <a className={this.props.classes.link}
                                                      href={`/display/${survey.Id}/${survey.PostId}/preview`}>Click here</a> to access it.</span>
                showMessage(msg);
            })
            .catch((error) => {
                if(error.response.status === 404){
                    showMessage('Please add some questions to the survey first.')
                }
                else {
                    showMessage('Some error occurred.')
                }
            });
    }

    startSurvey(survey) {

        this.setState({open: true, survey: survey});

    }

    onSelect = (id) => {

        const {actions2} = this.props;

        actions2.getResults(id).then(r => {
            this.setState({surveyLoading: null});
        });

        this.setState({selected: id, surveyLoading: id});

    };


    render() {
        const {surveyStore, classes} = this.props;


        const cards = surveyStore.surveys.map(survey => {

            var statusIcon;
            var statusLabel;
            if (survey.IsPublished) {
                statusLabel = 'Live';
                statusIcon = <Icon className={classes.rightIcon}>done</Icon>

            }
            else {
                statusLabel = 'Start';
                statusIcon = <Icon className={classes.rightIcon}>play_arrow </Icon>
            }


            return (


                <Card key={survey.Id} className={classes.card + (survey.Id === this.state.selected ? ' selected' : '')}

                      elevation={survey.Id === this.state.selected ? 0 : 2}>
                    <div className={`${classes.statusBar} ${survey.IsPublished ? 'running' : 'draft'}`}>

                    </div>
                    <CardContent className={classes.cardContnet} onClick={() => this.onSelect(survey.Id)}>


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

                        <Button name='start-btn' className={classes.button}
                                disabled={survey.IsPublished}
                                onClick={() => this.startSurvey(survey)}>

                            {statusLabel}{statusIcon}

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


        var surveyInfo;
        var hasResults = surveyStore.results.dateSubmitted && surveyStore.results.data.length > 0;

        var msg = surveyStore.results.dateSubmitted ? 'No results has been recorded for this survey yet.'
            : 'Please select a survey to see more info.';

        if (hasResults) {

            surveyInfo =
                <div>

                    <Card className={classes.infoCard} elevation={0}>
                        <CardContent className={classes.infoCardContent}>
                            <div className={classes.infoCardValue}>
                                <Typography className={classes.mainTitle}>Last submitted at:</Typography>
                                <Typography type="headline" component="h2">
                                    {/*be{bull}nev{bull}o{bull}lent*/}
                                </Typography>
                                {/*<Typography className={classes.pos}>adjective</Typography>*/}
                                <Typography type="headline" component="h2">
                                    {new Intl.DateTimeFormat('en-GB', {
                                        // year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    }).format(new Date(surveyStore.results.dateSubmitted))}
                                </Typography>
                            </div>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*<Button dense>Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </Card>


                    <Card className={classes.infoCard} elevation={0}>
                        <CardContent className={classes.infoCardContent}>
                            <div className={classes.infoCardValue}>
                                <Typography className={classes.mainTitle}>Participants:</Typography>
                                <Typography type="headline" component="h2">
                                    {/*be{bull}nev{bull}o{bull}lent*/}
                                </Typography>
                                {/*<Typography className={classes.pos}>adjective</Typography>*/}
                                <Typography type="headline" component="h2">
                                    {surveyStore.results.data[0].numAnswered}
                                </Typography>
                            </div>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*<Button dense>Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </Card>

                </div>


        }
        else {


            surveyInfo = <Card className={classes.infoCard} elevation={0}>
                <CardContent>
                    <Typography className={classes.mainTitle}>Survey info</Typography>
                    <Typography type="headline" component="h2">
                        {/*be{bull}nev{bull}o{bull}lent*/}
                    </Typography>
                    {/*<Typography className={classes.pos}>adjective</Typography>*/}
                    <Typography component="p">
                        {msg}
                    </Typography>
                </CardContent>
                {/*<CardActions>*/}
                {/*<Button dense>Learn More</Button>*/}
                {/*</CardActions>*/}
            </Card>;

        }


        return (







            <div style={{padding: '0 200px'}}>
                <Grid container
                      spacing={24}
                      justify="flex-end">
                    <Grid item xs={8}>

                        <Toolbar className={classes.toolbar}>
                            <Typography type="title" className={classes.mainTitle}>My Surveys</Typography>
                            <Button raised color="accent" elevation={1} className={classes.addButton}
                                    aria-label="add"
                                    onClick={this.createSurvey.bind(this)}>
                                New survey
                                <Icon className={classes.rightIcon}>add</Icon>
                            </Button>

                        </Toolbar>

                    </Grid>
                </Grid>

                <Grid
                    container
                    justify="center"
                    spacing={24}
                >

                    <Grid item xs={3}>
                        <div className={classes.sidebar}>
                            <Card className={classes.infoCard} elevation={0}>
                                <CardContent className={classes.infoCardContent}>
                                    <div className={classes.infoCardValue}>
                                        <Typography className={classes.mainTitle}>Total surveys:</Typography>
                                        {/*<Typography >adjective</Typography>*/}
                                        {/*<Typography component="p">*/}
                                        <Typography type="headline" component="h2">
                                            {surveyStore.surveys.length}
                                        </Typography>
                                    </div>
                                    <div className={classes.infoCardValue}>
                                        <Typography className={classes.mainTitle}>Total live:</Typography>
                                        {/*<Typography >adjective</Typography>*/}
                                        {/*<Typography component="p">*/}
                                        <Typography type="headline" component="h2">
                                            {surveyStore.surveys.filter(s => s.IsPublished).length}
                                        </Typography>
                                    </div>
                                </CardContent>
                                {/*<CardActions>*/}
                                {/*<Button dense>Learn More</Button>*/}
                                {/*</CardActions>*/}
                            </Card>

                            {surveyInfo}
                            {this.state.surveyLoading ?
                                <CircularProgress color="accent" className={classes.progress}/> : ''}

                            {/*<Card className={classes.infoCard} elevation={0}>*/}
                            {/*<CardContent>*/}
                            {/*<Typography className={classes.mainTitle}>Word of the Day</Typography>*/}
                            {/*<Typography type="headline" component="h2">*/}
                            {/*/!*be{bull}nev{bull}o{bull}lent*!/*/}
                            {/*</Typography>*/}
                            {/*/!*<Typography className={classes.pos}>adjective</Typography>*!/*/}
                            {/*<Typography component="p">*/}
                            {/*well meaning and kindly.<br/>*/}
                            {/*{'"a benevolent smile"'}*/}
                            {/*</Typography>*/}
                            {/*</CardContent>*/}
                            {/*<CardActions>*/}
                            {/*<Button dense>Learn More</Button>*/}
                            {/*</CardActions>*/}
                            {/*</Card>*/}
                        </div>
                    </Grid>

                    <Grid item xs={7}>

                        <ConfirmationDialog

                            open={this.state.open}
                            onClose={this.handleClose}
                            onOk={this.publishSurvey}
                            value={this.state.value}
                        />


                        <div className="cards-list">
                            {cards}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(withRouter(HomeView));


