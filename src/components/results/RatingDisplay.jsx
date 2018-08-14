import React from 'react';
import ReactDOM from 'react-dom';
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles,
    Icon,
    CardHeader,
    IconButton
} from "material-ui";
import {grey, green, yellow} from 'material-ui/colors';

import {Doughnut, HorizontalBar} from "react-chartjs-2";

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

class RatingDisplay extends React.Component {


    state = {chartType: 'bar', };

    constructor() {
        super();

    };

    componentWillMount() {
        const labels = Object.keys(this.props.data.results);

        const shortestLabel = labels.reduce((val, label) => Math.max(val, label.length), 0);

        if (shortestLabel > 30) {
            this.setState({
                chartType:'pie',
                hideBarOption: true
            })
        }
    }

    changeChart(type) {
        this.setState({chartType: type});
    }

    render() {
        const {classes, dateSubmitted} = this.props;

        const q = this.props.data;
        const values = Object.values(q.results);
        const answersTotal = values.reduce((n1, n2) => n1 + n2);
        const dataset = values.map(item => item / answersTotal * 100);
        // const labels = Object.keys(q.results).map(val => val.slice(0,30))
        const labels = Object.keys(q.results)


        const bgcolors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(239	,105,	80)',
            'rgba(231	,72	,   86)',
            'rgba(0	,120,	215)',
            'rgba(0	,153,	188)',
            'rgba(255	,140,	0)',
            'rgba(232	,17	,    35)',
            'rgba(0	,99	,   177)',
            'rgba(45	,125,	154)',
            'rgba(255	,185,	0)',
            'rgba(93	,90	,    88)',
            'rgba(247	,99	,    12)',
            'rgba(234	,0	,    94)',
            'rgba(142	,140,	216)',
            'rgba(0	,183,	195)',
            'rgba(104	,118,	138)',
            'rgba(105	,121,	126)',
            'rgba(202	,80	,    16)',
            'rgba(195	,0	,    82)',
            'rgba(107	,105,	214)',
            'rgba(3	,131,	135)',
            'rgba(74	,84	,    89)',
            'rgba(218	,59	,    1)',
            'rgba(227	,0	,    140)',
            'rgba(135	,100,	184)',
            'rgba(0	,178,	148)',
            'rgba(86	,124,	115)',
            'rgba(100	,124,	100)',
            'rgba(191	,0	,    119)',
            'rgba(116	,77	,    169)',
            'rgba(1	,133,	116)',
            'rgba(72	,104,	96)',
            'rgba(209	,52 ,	56)',
            'rgba(194	,57	,    179)',
            'rgba(177	,70	,    194)',
            'rgba(0	,204,	106)',
            'rgba(73	,130,	5)',
            'rgba(132	,117,	69)',
            'rgba(255	,67 ,	67)',
            'rgba(154	,0	,    137)',
            'rgba(136	,23 ,	152)',
            'rgba(16	,137,	62)',
            'rgba(16	,124,	16)',
            'rgba(126	,115,	95)'
        ]
        const data = {
            labels: labels,
            datasets: [{
                // label: '# of Votes',
                data: dataset,//[12, 19, 3, 5, 2, 3],
                backgroundColor: bgcolors,
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
            // scales: {
            //     xAxes: [{
            //         ticks: {
            //             max: 100,            //             min: 0,
            //             stepSize: 10,
            //             callback: function (value) {
            //                 return value + "%"
            //             }
            //         }
            //     }]
            // }
        };


        const barOptions = {
            ...options, scales: {
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
        }


        var chart = this.state.chartType === 'pie' ?
            <Doughnut ref='chart' data={data} width={100} height={300} options={options}/> :
            <HorizontalBar ref='chart' data={data} width={100} height={300} options={barOptions}/>


        return (

            <Card className={classes.card}>
                {!this.state.hideBarOption && <CardHeader
                    action={<div>
                        <IconButton onClick={() => this.changeChart('pie')} disabled={this.state.chartType === 'pie'}>
                            <Icon>pie_chart</Icon>
                        </IconButton>
                        <IconButton onClick={() => this.changeChart('bar')} disabled={this.state.chartType === 'bar'}>
                            <Icon>insert_chart</Icon>
                        </IconButton></div>
                    }

                />}
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
                        {chart}
                    </div>

                    <div className={classes.root}>
                        {/*<Paper className={classes.root} elevation={0} >*/}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell  style={{padding: 0}}></TableCell>
                                    <TableCell padding='dense'>Choices</TableCell>
                                    <TableCell numeric>Responses %</TableCell>
                                    <TableCell numeric># Chosen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {labels.map((l, i) => {

                                    // if (l === 'true') {
                                    //     l = 'Yes'
                                    // }
                                    // else if (l === 'false') {
                                    //     l = 'No';
                                    // }

                                    return (

                                        <TableRow key={'i' + i}>
                                            <TableCell  style={{padding: 0}}>
                                                <div
                                                    style={{backgroundColor: bgcolors[i], width: 10, height: 10}}></div>
                                            </TableCell>
                                            <TableCell>{l}</TableCell>
                                            <TableCell
                                                numeric>{(dataset[i]).toFixed(2)}%</TableCell>
                                            <TableCell numeric>{values[i]}</TableCell>
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

export default withStyles(styles)(RatingDisplay);

