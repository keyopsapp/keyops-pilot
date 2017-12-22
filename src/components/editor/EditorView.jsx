import React, {Component} from 'react';
import 'survey-react/survey.css';
import SurveyEditor from './SurveyEditor';
// import logo from './logo.svg';
// import './App.css';
import {observer} from 'mobx-react'
import EditTitle from "../common/EditTitle";

@observer
class Editor extends Component {

    componentDidMount() {

        const {match: {params}} = this.props;
        // this.props.actions2.getSurveys();
        // actions2.getSurveyById(id);

        this.props.actions2.getSurveyById(params.surveyId);
    }

    savesurvey(data) {
        // console.log('asdas')
        const {actions2, match: {params}} = this.props;

        // const updated = {...surveyStore.survey, data:data};

        actions2.updateSurvey(params.surveyId, data);
    }

    changeSurveyName = (newName) => {
        const {actions2, surveyStore} = this.props;

        actions2.changeSurveyName(surveyStore.survey.Id, newName);
    };

    render() {

        // var model = new Survey.Model(this.json);

        // const {surveyStore} = this.props;
        const {match: {params}, surveyStore} = this.props;

        // console.log(surveyStore.survey.data)


        return (
            <div className="App">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <EditTitle value={surveyStore.survey.Name} onChange={this.changeSurveyName}/>
                </div>
                <div className="surveyjs">

                    <SurveyEditor surveyId={params.surveyId} save={this.savesurvey.bind(this)}/>
                </div>

            </div>
        );
    }
}

export default Editor;
