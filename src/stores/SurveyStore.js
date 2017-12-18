import {observable, action} from 'mobx'

class SurveyStore {
    @observable surveys = [];
    // @observable survey;
    @observable.shallow survey = {};


    constructor() {

        // extendObservable({
        //     // message: "Hello world",
        //     survey: observable.ref(null)
        // })
        // this.surveys = [];
        // this.survey = {};
        // this.survey.data = @observable.ref(null)

    }

    @action
    getSurveys(surveys) {
        this.surveys = surveys;
    }

    @action
    getSurvey(survey) {

        this.survey = survey;
    }

    @action
    addSurvey(survey) {
        this.surveys = [...this.surveys, survey];
        // this.survey = survey;
    }

    @action
    updateSurvey(nextSurvey) {
        this.surveys = this.surveys.map(survey => {
            if (survey.id === nextSurvey.id) {
                return nextSurvey;
            }

            return survey;
        });

        if (this.survey.id === nextSurvey.id) {
            this.survey = nextSurvey;
        }
    }

    @action
    deleteSurvey(id) {
        this.surveys = this.surveys.filter(survey => {
            return survey.id !== id
        });

        if (this.survey.id === id) {
            this.survey = {};
        }
    }
}

const surveyStore = new SurveyStore();

export default surveyStore;
export {SurveyStore};
