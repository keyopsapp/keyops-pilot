import orderBy from 'lodash/orderBy';

export default class SurveyApi {

    constructor(apiCore) {
        this.API = apiCore;
    }

    getSurveys() {
        // return this.API.get(`${SurveyApi.privatePath}/getActive`, {
        //     accessKey: SurveyApi.accessKey,
        //     ownerId: 'keyopsmvp-prod'
        // })
        //
        return this.API.get(SurveyApi.surveyPath)
            .then((res) => {
                return orderBy(res, ['IsPublished', 'CreatedAt'], ['desc', 'desc'])

            })
    }

    getSurveyById(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}`);
    }

    createSurvey(name) {

        return this.API.post(`${SurveyApi.surveyPath}`, {
            name: name
        });
    }


    updateSurvey(id, survey) {

        // var fd = new URLSearchParams();
        // fd.append( 'Text',  survey);
        // fd.append( 'Id',  id);

        return this.API.put(`${SurveyApi.surveyPath}/${id}`, {
                data: survey
            }
        );
        // return this.API.postForm(`${SurveyApi.privatePath}/changeJson?accessKey=${SurveyApi.accessKey}`, fd);
    }

    changeSurveyName(id, newName) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}/rename`, {
            name: newName
        });
    }


    startSurvey(id) {

        return this.API.get(`${SurveyApi.surveyPath}/${id}/start`);
    }

    getResults(id) {
        return this.API.get(`${SurveyApi.surveyPath}/${id}/results`);
    }
}
SurveyApi.surveyPath = '/api/survey';
SurveyApi.publicPath = 'https://api.dxsurvey.com';
SurveyApi.privatePath = 'https://surveyjs.io/api/MySurveys';
SurveyApi.accessKey = 'b4a00480f27c438596d828bc42da477a';
