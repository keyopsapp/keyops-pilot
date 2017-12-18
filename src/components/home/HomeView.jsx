import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {Button, Grid, Typography, Toolbar} from 'material-ui'
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import {withRouter} from 'react-router-dom';

import {grey, green, yellow} from 'material-ui/colors'

import {withStyles} from 'material-ui/styles';

const styles = theme => ({
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
            backgroundColor: yellow[500]
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
            .then(survey => history.push('/edit/' + survey.id))
    }

    editSurvey(id) {
        const {history} = this.props;
        history.push(`/edit/${id}`);
    }


    startSurvey(survey) {
        const {actions2} = this.props;

        // const updated = {...survey, status: 'running'};
        // console.log(updated)
        actions2.startSurvey(survey.id);
    }


    render() {
        const {surveyStore, classes} = this.props;


        const cards = surveyStore.surveys.map(survey => {

            return (


                <Card key={survey.id} className={classes.card}>
                    <div className={`${classes.statusBar} ${survey.status}`}>

                    </div>
                    <CardContent className={classes.cardContnet}>


                        <div>

                            {/*<Typography className={classes.title}>Created: 12/11/2017</Typography>*/}
                            <Typography type="headline" component="h2">
                                {survey.name}
                            </Typography>
                            <Typography className={classes.pos}>Created: 12/11/2017</Typography>
                        </div>
                        <div className={classes.info}>
                            <Typography type="subheading" component="h3">
                                Responses: {survey.data.count}/10 (30%)
                            </Typography>

                        </div>

                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Button className={classes.button}
                                disabled={survey.status !== 'draft'}
                                onClick={() => this.startSurvey(survey)}>
                            Start
                            <Icon className={classes.rightIcon}>play_arrow</Icon>
                        </Button>
                        <Button className={classes.button}
                                disabled={survey.status !== 'draft'}
                                onClick={() => this.editSurvey(survey.id)}>
                            Edit
                            <Icon className={classes.rightIcon}>edit</Icon>
                        </Button>
                        <Button className={classes.button}
                                disabled={survey.status === 'draft'}

                        >
                            View
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
                    <Grid item xs={8}>

                        <Toolbar className={classes.toolbar}>
                            <Typography type="title" className={classes.mainTitle}>My Surveys</Typography>
                            <Button fab color="primary" aria-label="add"
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
