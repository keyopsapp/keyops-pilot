import React, {Component} from 'react';
import * as Survey from 'survey-react';
// import 'survey-react/survey.css';
import SurveyDisplay from './SurveyDisplay';
// import logo from './logo.svg';
// import './App.css';
import {observer} from 'mobx-react'
// import 'bootstrap/dist/css/bootstrap.css';
import {Grid, Paper, withStyles} from "material-ui";

const styles = {
    page: {
        padding: 20,
        height: '100%'
    }
}

@observer
class DisplayView extends Component {

    componentWillMount() {

        const {match: {params}} = this.props;
        // this.props.actions2.getSurveys();

        // this.props.actions2.getSurveyById(params.surveyId);

        // const {surveyStore, match: {params}} = this.props;


        // const pub = surveyStore.survey.publishedinfo ? surveyStore.survey.publishedinfo : {};
        //{"survey":{"pages":[{"name":"page1","elements":[{"type":"radiogroup","choices":["item1","item2","item3"],"name":"question1"}]}]},"isCompleted":"no"}

        const data = {
            firstPageIsStarted: true,
            sendResultOnPageNext: true,
            // goNextPageAutomatic: true,
            // cookieName: 'keyops_participant',
            surveyId: params.surveyId,
            surveyPostId: params.postId,
            clientId: params.clientId,
            startSurveyText: "Start"
        };


        this.model = new Survey.Model(data);
        // model.firstPageIsStarted = true;
    }

    onPageChange = (e, opt) => {

        if (!opt.oldCurrentPage || opt.newCurrentPage.id > opt.oldCurrentPage.id) {
            window.scrollTo(0, 0);
        }

    };


    render() {

        const {classes} = this.props;


        // const pub = surveyStore.survey.publishedinfo ? surveyStore.survey.publishedinfo : {};

        // const data = {
        //     // firstPageIsStarted: true,
        //     // sendResultOnPageNext:true,
        //     // goNextPageAutomatic: true,
        //     // cookieName: 'keyops_participant',
        //     surveyId: params.surveyId,
        //     surveyPostId: params.postId,
        //     clientId: params.clientId,
        //     // startSurveyText: "Start",
        //
        //
        // };
        //
        //
        // const model = new Survey.Model(data);
        // model.firstPageIsStarted = true;
        // model.startSurveyText = 'Start Now';


        // console.log(surveyStore.survey.data)

        const survey = this.model ? <Survey.Survey model={this.model} onCurrentPageChanged={this.onPageChange}/> : null;

        return (survey)
        {/*<Grid container*/
        }
        {/*spacing={24}*/
        }
        {/*justify="center">*/
        }
        {/*<Grid item xs={6}>*/
        }
        {/*<Paper className={classes.page}>*/
        }
        {/*<div className="surveyjs">*/
        }
        // survey
        {/*</div>*/
        }
        {/*</Paper>*/
        }
        // </Grid>
        // </Grid>
        // );
    }
}

export default withStyles(styles)(DisplayView);
