import React, {Component} from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import SurveyDisplay from './SurveyDisplay';
// import logo from './logo.svg';
// import './App.css';
import {observer} from 'mobx-react'
import 'bootstrap/dist/css/bootstrap.css';

@observer
class DisplayView extends Component {

    componentDidMount() {

        const {match: {params}} = this.props;
        // this.props.actions2.getSurveys();

        this.props.actions2.getSurveyById(params.surveyId);
    }


    render() {

        const {surveyStore} = this.props;


        const pages = surveyStore.survey.data ? surveyStore.survey.data.pages : {};

        const text = 'Please click start to begin the survey.';
        const data = {
            firstPageIsStarted: true,
            goNextPageAutomatic: true,
            cookieName: 'keyops_participant',
            // startSurveyText: "Start",

            pages: [{
                "name": "page1",
                "elements": [{"type": "html", "name": "question1", "html": text}]
            }, ...pages]
        };


        const model = new Survey.Model(data);
        // model.firstPageIsStarted = true;
        // model.startSurveyText = 'Start Now';


        // console.log(surveyStore.survey.data)

        return (
            <div className="App">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h2>{surveyStore.survey.name}</h2>
                </div>
                <div className="surveyjs">

                    <Survey.Survey model={model}/>

                </div>

            </div>
        );
    }
}

export default DisplayView;
