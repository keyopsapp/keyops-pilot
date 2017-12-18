export default class SurveyApi {
    constructor(apiCore) {
        this.API = apiCore;
    }

    getSurveys() {
        return this.API.get(SurveyApi.surveyPath);
    }

    getSurveyById(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}`);
    }

    createSurvey(survey) {
        return this.API.post(SurveyApi.surveyPath, survey);
    }

    updateSurvey(id, survey) {
        return this.API.put(SurveyApi.surveyPath + '/' + id, survey);
    }
    startSurvey(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}/start`);
    }
}

SurveyApi.surveyPath = '/api/survey';
