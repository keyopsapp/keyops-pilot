export default class SurveyApi {
    constructor(apiCore) {
        this.API = apiCore;
    }

    getSurveys() {
        return this.API.get(SurveyApi.surveyPath);
    }

    createSurvey(survey) {
        return this.API.post(SurveyApi.surveyPath, survey);
    }

    updateSurvey(id, survey) {
        return this.API.put(SurveyApi.surveyPath + '/' + id, survey);
    }
}

SurveyApi.surveyPath = '/api/survey';
