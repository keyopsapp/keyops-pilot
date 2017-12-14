import surveyStore from '../stores/SurveyStore';
import api from '../api';

export function getSurveys() {
    api.surveyApi.getSurveys()
        .then(res => surveyStore.getSurveys(res))
        .catch(err => {
            console.error(err);
        });
}

export function getSurvey(id) {
    api.surveyApi.getSurvey(id)
        .then(res => surveyStore.getSurvey(res))
        .catch(err => {
            console.error(err);
        });
}

export function createSurvey(survey) {

    survey = {name: 'Survey: ' + surveyStore.surveys.length, data: {count: 0}};

    api.surveyApi.createSurvey(survey)
        .then(res => surveyStore.addSurvey(res))
        .catch(err => {
            console.error(err);
        });
}

export function updateSurvey(id, survey) {
    console.log(survey)
    api.surveyApi.updateSurvey(id, survey)
        .then(res => surveyStore.updateSurvey(res))
        .catch(err => {
            console.error(err);
        });
}

export function deleteSurvey(id) {
    api.surveyApi.deleteSurvey(id)
        .then(res => surveyStore.deleteSurvey(id))
        .catch(err => {
            console.error(err);
        });
}