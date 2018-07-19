import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles} from "material-ui";
import {grey, green, yellow} from 'material-ui/colors';

import {HorizontalBar} from "react-chartjs-2";
const styles = theme => ({
    cardContnet: {
        // display: 'flex',
        // alignItems: 'center',
        // flex: 1
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1

    },
    card: {
        '&:not(:first-child)': {
            marginTop: 100,
        },
        padding: 50
        // minWidth: 275,
        // display: 'flex',
        // position: 'relative'
    },

    button: {
        position: 'relative',
        height: '100%',
        margin: 0,

    },
    cardActions: {
        // position: 'relative',
        // flex: 1,
        // height: 'auto',
        // justifyContent: 'flex-end',
        // padding: 0

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
        marginBottom: 30,
        marginTop: 30,
        marginLeft: 10,
        display: 'flex'

        // color: theme.palette.text.secondary
    },
    pos2: {
        // marginBottom: 12,
        // marginTop: 30,
        // marginLeft: 10,
        marginRight: 20,
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
    },
    chartContainer: {
        // width: 500,
        // display:'flex',
        // justifyContent: 'center'
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 4,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },

});

class SelectDisplayBase extends React.Component {


    constructor() {
        super();

    };

    render() {
        const {classes, dateSubmitted} = this.props;

        const q = this.props.data;
        const values = Object.values(q.results);
        const answersTotal = values.reduce((n1, n2) => n1 + n2);
        const dataset = values.map(item => item / answersTotal * 100);
        const labels = Object.keys(q.results);

        const data = {
            labels: labels,
            datasets: [{
                // label: '# of Votes',
                data: dataset,//[12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                // borderColor: [
                //     'rgba(255,99,132,1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                // borderWidth: 1
            }]
        }

        const options = {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 150,
                    right: 200,
                    // top: 0,
                    // bottom: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10,
                        callback: function (value) {
                            return value + "%"
                        }
                    }
                }]
            }
        };


        return (

            <Card className={classes.card}>

                <CardContent className={classes.cardContnet}>


                    <div>

                        {/*<Typography className={classes.title}>Created: 12/11/2017</Typography>*/}
                        <Typography type="display2">
                            {q.title}
                        </Typography>
                        <div className={classes.pos}>
                            <Typography className={classes.pos2}>Total Answered: {q.numAnswered}</Typography>
                            <Typography className={classes.pos2}>Last Submitted: {new Intl.DateTimeFormat('en-GB', {
                                // year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            }).format(new Date(dateSubmitted + 'Z'))}</Typography>
                        </div>
                    </div>
                    {/*<div className={classes.info}>*/}
                    {/*<Typography type="subheading" component="h3">*/}
                    {/*Responses: 3/10 (30%)*/}
                    {/*</Typography>*/}

                    {/*</div>*/}

                    <div className={classes.chartContainer}>
                        <HorizontalBar ref='chart' data={data} width={100} height={300} options={options}/>
                    </div>

                    <div className={classes.root}>
                        {/*<Paper className={classes.root} elevation={0} >*/}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding='dense'>Choices</TableCell>
                                    <TableCell numeric>Responses %</TableCell>
                                    <TableCell numeric># Chosen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {labels.map((l, i) => {
                                    return (

                                        <TableRow key={'i' + i}>
                                            <TableCell>{l}</TableCell>
                                            <TableCell
                                                numeric>{(dataset[i]).toFixed(2)}%</TableCell>
                                            <TableCell numeric>{values[i]}</TableCell>
                                            {/*<TableCell numeric>{n.calories}</TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {/*</Paper>*/}
                    </div>
                </CardContent>

                {/*<CardActions className={classes.cardActions}>*/}
                {/*<Button className={classes.button}*/}
                {/*disabled={survey.IsPublished}*/}
                {/*onClick={() => this.startSurvey(survey.Id)}>*/}
                {/*Start*/}
                {/*<Icon className={classes.rightIcon}>play_arrow</Icon>*/}
                {/*</Button>*/}
                {/*<Button className={classes.button}*/}
                {/*disabled={survey.IsPublished}*/}
                {/*onClick={() => this.goTo('edit', survey.Id)}>*/}
                {/*Edit*/}
                {/*<Icon className={classes.rightIcon}>edit</Icon>*/}
                {/*</Button>*/}
                {/*<Button className={classes.button}*/}
                {/*disabled={!survey.IsPublished}*/}
                {/*onClick={() => this.goTo('results', survey.Id)}>*/}


                {/*Results*/}
                {/*<Icon className={classes.rightIcon}>equalizer</Icon>*/}
                {/*</Button>*/}
                {/*</CardActions>*/}

            </Card>)
    }


}
export default withStyles(styles)(SelectDisplayBase);

