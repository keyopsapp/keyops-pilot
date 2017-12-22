import orderBy from 'lodash/orderBy';

export default class SurveyApi {

    constructor(apiCore) {
        this.API = apiCore;
    }

    getSurveys() {
        return this.API.get(`${SurveyApi.privatePath}/getActive`, {
            accessKey: SurveyApi.accessKey,
            ownerId: 'keyopsmvp-prod'
        }).then((res) => {
            return orderBy(res, ['IsPublished', 'CreatedAt'], ['desc', 'desc'])

        })
    }

    getSurveyById(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}`);
    }

    createSurvey(name) {
        return this.API.get(`${SurveyApi.privatePath}/create`, {
            accessKey: SurveyApi.accessKey,
            ownerId: 'keyopsmvp-prod',
            name: name
        });
    }


    updateSurvey(id, survey) {
        return this.API.post(`${SurveyApi.privatePath}/changeJson?accessKey=${SurveyApi.accessKey}`, {
            json: survey,
            // text: survey,
            id: id
        });
    }

    changeSurveyName(id, newName) {
        return this.API.get(`${SurveyApi.privatePath}/changeName/${id}`, {
            accessKey: SurveyApi.accessKey,
            name: newName
        });
    }


    startSurvey(id) {
        return this.API.get(`${SurveyApi.privatePath}/publish/${id}`, {
            accessKey: SurveyApi.accessKey,
            generateNewId: true
        });
    }

    getResults(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}/results`);
    }
}
SurveyApi.surveyPath = '/api/survey';
SurveyApi.publicPath = 'https://api.dxsurvey.com';
SurveyApi.privatePath = 'https://surveyjs.io/api/MySurveys';
SurveyApi.accessKey = 'b4a00480f27c438596d828bc42da477a';
