import React, {Component} from 'react';
import * as SurveyJSEditor from 'surveyjs-editor';

class SurveyEditor extends Component {

    componentDidMount() {
        const {surveyId} = this.props;


        let defs = SurveyJSEditor
            .SurveyQuestionEditorDefinition
            .definition;
        //     this.editor.loadSurvey(surveyId)


        defs["questionbase"].tabs = [{name: 'visibleIf', title: 'Visible If (Coming Soon)', index: 100}]
        defs["questionbase"]
            .properties = ['name', 'description','isRequired'];


        defs["text"]
            .properties = ['placeHolder'];

        defs["selectbase"]
            .properties = [{name: 'hasOther', 'title': 'Add "Other" option'}, {
            name: 'hasComment',
            'title': 'Add "Other" option with comment'
        }];

        defs["boolean"]
            .properties = [];

        defs["rating"].properties = [{name: 'rateMin', title: 'Min Rate Value'}, {
            name: 'rateMax',
            title: 'Max Rate Value'
        }];

        let editorOptions = {
            showEmbededSurveyTab: false, showJSONEditorTab: false, showPropertyGrid: false,
            questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "comment", "rating", "boolean"]
        };

        this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', editorOptions);
        this.editor.loadSurvey(surveyId);
        this.editor.isAutoSave = true;

        // SurveyJSEditor.defaultStrings.p["hasComment"] = "Include a comment";
        // SurveyJSEditor.defaultStrings.p["visibleIf"] = "Visible If (Coming Soon)";


        // SurveyEditor.SurveyQuestionEditorDefinition.definition["questionbase"].properties =
        //     ["title", "name", {name: "tag", title: "Tag"}, {name: "visible", category: "checks"}, {name: "isRequired", category: "checks"}];

        // console.log('hey!')
        // console.log(this.props.data)
        // this.editor.text = this.props.data;

        // var newTextItem = {
        //     "name": "bolean",
        //     "showTItle": true,
        //     "iconName": "icon-boolean",
        //     "title": "Single Input",
        //     "json": {"type": "text", inputType: "date"}
        //
        // };

        // this.editor.survey.goNextPageAutomatic = true;
        // this.editor.survey.firstPageIsStarted = true;
        // this.editor.survey.startSurveyText = 'Start Now';
        // this.editor.survey.showNavigationButtons = false;
        // var data = this.editor.toolbox.items.filter(item => {
        //     return item.name == 'boolean';
        // })[0];
        //
        // data.json.showTitle = true;


        this.editor.saveSurveyFunc = this.saveMySurvey;


// this.propsToHide = ['startWithNewLine', 'visible', 'isRequired', 'visibleIf', 'title', 'inputType', 'choicesOrder', 'colCount', 'choicesByUrl'];
        this.propsToHide = ['visibleIf', 'choicesByUrl', 'rateValues'];
//
//
        this.editor.onQuestionAdded.add((editor, options) => {
            options.question.isRequired = true;
        });

        this.editor.onCanShowProperty.add((editor, options) => {

            if (options.property.name === "isRequired") {
                options.canShow = false;
            }
            else {
                options.canShow = true;
            }
            if (options.property.name === "visibleIf") {
                options.property.alternativeName = 'visibleIf (coming soon)';
            }
        });


// console.log(this.editor.toolbox.items.map(item => item.name))
    }

    render() {


        // this.editor.text = this.props.data;
        // if (this.editor && surveyId) {
        //     this.editor.loadSurvey(surveyId)

        // this.editor.text = typeof this.props.data === 'string' ? this.props.data : JSON.stringify(this.props.data);
        // }

        return (
            <div id="surveyEditorContainer"></div>
        );
    }

    saveMySurvey = () => {
        this.props.save(this.editor.text);
    }
}

export default SurveyEditor;
