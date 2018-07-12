import React, {Component} from 'react';
import * as SurveyJSEditor from 'surveyjs-editor';
import * as Survey from 'survey-react';

class SurveyEditor extends Component {

    componentDidMount() {
        //     this.editor.loadSurvey(surveyId)
        let defs = SurveyJSEditor
            .SurveyQuestionEditorDefinition
            .definition;


        const {surveyId} = this.props;

        defs["rating"].tabs = [{name: 'rateValues', title: 'Rating values definitions', index: 1}]

        // console.log(defs["rating"].tabs )
        defs["questionbase"].tabs = [{name: 'visibleIf', title: 'Visible If (Coming Soon)', index: 100}]
        defs["questionbase"]
            .properties = [
            {name: 'name', title: 'Question text'},
            'isRequired'];


        defs["text"]
            .properties = [{name: 'description', title: 'Additional info (if applicable)'}, {
            name: 'placeHolder',
            title: 'Sample answer (if applicable)'
        }];

        defs["selectbase"]
            .properties = [
            {name: 'hasOther', 'title': 'Add "Other" option'},
            {name: 'hasComment', 'title': 'Add "Other" option with comment'},
            {name: 'description', title: 'Further instructions'},
            {
                name: 'chocies', properties: [
                {name: 'itemvalue', properties: [{name: 'text', visible: false}]}

            ]
            }
        ];

        defs["boolean"]
            .properties = [];

        defs["rating"].properties = [
            {name: 'rateMin', title: 'Min Rate Value'}, {
                name: 'rateMax',
                title: 'Max Rate Value'
            }];

        let editorOptions = {
            showEmbededSurveyTab: false, showJSONEditorTab: false, showPropertyGrid: false,
            questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "comment", "rating", "boolean"]
        };

        this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', editorOptions);
        console.log(this.editor)
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
//         this.propsToHide = ['visibleIf', 'choicesByUrl', 'rateValues'];
//


        this.editor.survey.requiredText = "";


        this.editor.onQuestionAdded.add((editor, options) => {
            options.question.isRequired = true;

            var t = options.question.getType();
            options.question.title = 'Q' + options.question.title.slice(1);
            // options.question.requiredText = '';


            console.log(options.question)
            if (['dropdown', 'radiogroup'].indexOf(t) > -1) {
                options.question.description = 'Select best answer';
                options.question.otherText = 'Other';
            }

            if (t === 'checkbox') {
                options.question.description = 'Check all that applies';
            }
            // if (options.property.name === "description") {
            //     options.obj.value = 'asdasds';
            //     options.obj.setDefaultValue()
            //
            // }
        });

        this.editor.onCanShowProperty.add((editor, options) => {

            console.log(options.property.name)

            if (options.property.name === 'choices') {

                // options.property.visible= false
                console.log(options)
            }

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
