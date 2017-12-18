import React, {Component} from 'react';
import 'survey-react/survey.css';
import SurveyEditor from './SurveyEditor';
// import logo from './logo.svg';
// import './App.css';
import { observer } from 'mobx-react'

@observer
class Editor extends Component {

    componentDidMount() {

        const  {match: { params }} = this.props;
        // this.props.actions2.getSurveys();

        this.props.actions2.getSurveyById(params.surveyId);
    }

    savesurvey(data) {
        // console.log('asdas')
        const {actions2, surveyStore} = this.props;

        const updated = {...surveyStore.survey, data:data};
        actions2.updateSurvey(surveyStore.survey.id, updated);
    }

    render() {

        // var model = new Survey.Model(this.json);

        const {surveyStore} = this.props;

        // console.log(surveyStore.survey.data)

        return (
            <div className="App">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h2>{ surveyStore.survey.name}</h2>
                </div>
                <div className="surveyjs">

                    <SurveyEditor data={surveyStore.survey.data} save={this.savesurvey.bind(this)}/>
                </div>

            </div>
        );
    }
}

export default Editor;
