import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {
    Paper, Grid, Card, CardContent, CardActions, Typography, Button, Icon, Table, TableRow,
    TableCell, TableBody, TableHead
} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {HorizontalBar} from 'react-chartjs-2';
import SelectDisplayBase from "./SelectDisplayBase";
import TextDisplayBase from "./TextDisplayBase";
import RatingDisplay from "./RatingDisplay";


@observer
class ResultsView extends Component {

    componentDidMount() {

        const {match: {params}} = this.props;

        this.props.actions2.getResults(params.surveyId);
        // this.props.actions2.getSurveyById(params.surveyId);
        // console.log(this.refs.chart.chart_instance);
        // this.refs.chart.chart_instance.config.type = 'horizontalBar';

    }

    componentWillUnmount() {
         this.props.actions2.resetResults();
    }


    render() {


        const {surveyStore} = this.props;
        const {data, totalResults, dateSubmitted} = surveyStore.results;

        console.log(data)
        const items = data.map((q, i) => {
            if (['radiogroup', 'checkbox', 'dropdown', ].indexOf(q.type) > -1) {
                return <SelectDisplayBase key={q.name} dateSubmitted={dateSubmitted} data={q}/>

            }
            else if (['comment', 'text'].indexOf(q.type) > -1) {
                return <TextDisplayBase key={q.name} dateSubmitted={dateSubmitted} data={q}/>

            }
            else if (['rating', 'boolean'].indexOf(q.type) > -1) {
                return <RatingDisplay key={q.name} dateSubmitted={dateSubmitted} data={q}/>

            }
        });


        let text;

        // console.log(totalResults)
        if (totalResults > 0) {
            text = 'Results';
        }
        else if (totalResults === 0) {
            text = 'No results yet. Please come back later.'
        }
        else {
            text = 'Loading...'
        }
        return (
            <Grid container
                  spacing={24}
                  justify="center">
                <Grid item xs={8}>

                    <h2>{text}</h2>
                </Grid>
                <Grid item xs={8}>

                    {items}

                </Grid>

            </Grid>
        );
    }
}

export default (ResultsView);
