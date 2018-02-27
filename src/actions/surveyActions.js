import surveyStore from '../stores/SurveyStore';
import api from '../api';

export function getSurveys() {
    return api.surveyApi.getSurveys()
        .then(res => surveyStore.getSurveys(res))
        .catch(err => {
            console.error(err);
        });
}

export function getSurveyById(id) {
    // api.surveyApi.getSurveyById(id)
    //     .then(res => surveyStore.getSurvey(res))
    //     .catch(err => {
    //         console.error(err);
    //     });

    const p = surveyStore.surveys.length === 0 ? this.getSurveys() : Promise.resolve(surveyStore.surveys);

    p.then(surveys => {
        surveyStore.surveys.forEach(survey => {
                if (survey.Id === id) {
                    surveyStore.getSurvey(survey);
                }
            }
        )
    })


}

export function createSurvey() {

    // survey = {name: 'Survey: ' + surveyStore.surveys.length, data: {count: 0}};

    return api.surveyApi.createSurvey(`Untitled survey ${surveyStore.surveys ? surveyStore.surveys.length + 1 : 0}`)
        .then(res => {
            surveyStore.addSurvey(res);
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export function updateSurvey(id, survey) {
    // console.log(survey)
    api.surveyApi.updateSurvey(id, survey)
        .then(res => surveyStore.updateSurvey(res))
        .catch(err => {
            console.error(err);
        });
}

export function setCurrent(id) {
    surveyStore.setCurrent(id);
}


export function startSurvey(id, surveyName, groupId) {
    // console.log(survey)
    return api.surveyApi.startSurvey(id, surveyName, groupId)
        .then(res => surveyStore.startSurvey(id))
    // .catch(err => {
    //     console.error(err);
    //     return err;
    // });
}

export function deleteSurvey(id) {
    api.surveyApi.deleteSurvey(id)
        .then(res => surveyStore.deleteSurvey(id))
        .catch(err => {
            console.error(err);
        });
}

export function getResults(id) {
    return api.surveyApi.getResults(id)
        .then(res => surveyStore.getResults(res))
        .catch(err => {
            console.error(err);
        });
}

export function changeSurveyName(id, newName) {
    api.surveyApi.changeSurveyName(id, newName)
        .then(res => surveyStore.changeSurveyName(id, newName))
        .catch(err => {
            console.error(err);
        });
}

export function resetResults() {
    surveyStore.restResults();
}