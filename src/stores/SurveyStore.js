import {observable, action} from 'mobx'
// import chain from 'lodash/chain';
// import compact from 'lodash/compact';
// import reduce from 'lodash/reduce';

class SurveyStore {
    @observable surveys = [];
    // @observable survey;
    @observable current = {amount: 0};
    @observable.shallow survey = {};
    @observable results = {data: []};

    // @observable totalResults;


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
    setAmount(amount) {
        this.current.amount = amount;
    }

    getAmount() {
        return this.current.amount;
    }

    @action
    restResults() {
        this.results = {data: []};
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
        // this.surveys = this.surveys.map(survey => {
        //     if (survey.id === nextSurvey.id) {
        //         return nextSurvey;
        //     }
        //
        //     return survey;
        // });
        //
        // if (this.survey.id === nextSurvey.id) {
        //     this.survey = nextSurvey;
        // }
    }

    @action
    startSurvey(id) {
        this.surveys.forEach(survey => {
            if (survey.Id === id) {
                survey.IsPublished = true;
            }

        });

        // if (this.survey.id === id) {
        //     this.survey = nextSurvey;
        // }
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

    @action
    getResults(results) {

        this.results = results;
        // this.totalResults = total;

    }


    @action
    changeSurveyName(id, newName) {
        this.surveys.forEach(survey => {
            if (survey.Id === id) {
                survey.Name = newName;
            }

        });
    }

}

const surveyStore = new SurveyStore();

export default surveyStore;
export {SurveyStore};