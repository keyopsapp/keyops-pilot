import { observable, action } from 'mobx'
import axios from 'axios';

class SurveyStore {
  @observable surveys;
  @observable survey;

  constructor() {
    this.surveys = [];
    this.survey = {};
  }

  @action getSurveys(surveys) {
      this.surveys = surveys;
  }

  @action getSurvey(survey) {
    this.survey = survey;
  }

  @action addSurvey(survey) {
    this.surveys = [...this.surveys, survey];
  }

  @action updateSurvey(nextSurvey) {
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

  @action deleteSurvey(id) {
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
export { SurveyStore };
