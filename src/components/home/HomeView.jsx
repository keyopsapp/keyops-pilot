import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Button, Grid, Paper, Typography, Toolbar} from 'material-ui'
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Icon from 'material-ui/Icon';


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
        display: 'flex'
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
});


@observer
class HomeView extends Component {


    componentDidMount() {
        this.props.actions2.getPeople();
        this.props.actions2.getSurveys();
    }


    render() {
        const {appStore, surveyStore, classes} = this.props


        const cards = surveyStore.surveys.map(person => {

            return (

                <Card key={person.id} className={classes.card}>
                    <CardContent className={classes.cardContnet}>

                        <div>
                            {/*<Typography className={classes.title}>Created: 12/11/2017</Typography>*/}
                            <Typography type="headline" component="h2">
                                {person.name}
                            </Typography>
                            <Typography className={classes.pos}>Created: 12/11/2017</Typography>
                        </div>
                        <div className={classes.info}>
                            <Typography type="subheading" component="h3">
                                Responses: {person.data.count}/10 (30%)
                            </Typography>

                        </div>

                    </CardContent>

                    <CardActions className={classes.cardActions}>
                        <Button className={classes.button}>
                            Start
                            <Icon className={classes.rightIcon}>play_arrow</Icon>
                        </Button>
                        <Button className={classes.button}
                                onClick={() => this.props.actions2.updateSurvey(person.id, {...person, data:{count: person.data.count+1}})}>
                            Edit
                            <Icon className={classes.rightIcon}>edit</Icon>
                        </Button>
                        <Button className={classes.button}>
                            View
                            <Icon className={classes.rightIcon}>equalizer</Icon>
                        </Button>
                    </CardActions>
                </Card>




            );
        })


        return (



            <div>
                <Grid container
                      spacing={24}

                      justify="center">
                    <Grid item xs={8}>

                        <Toolbar className={classes.toolbar}>
                            <Typography type="title" className={classes.mainTitle}>My Surveys</Typography>
                            <Button fab color="primary" aria-label="add"
                                    onClick={() => this.props.actions2.createSurvey()}>
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


export default withStyles(styles)(HomeView);