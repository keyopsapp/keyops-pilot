import surveyStore from '../stores/SurveyStore';
import api from '../api';
const DATA = [{"Name":"Ferring Test survey","IsArchived":false,"UserId":"c6a354b9-44e3-42c3-b21a-89ea72da4150","CreatorId":"00000000-0000-0000-0000-000000000000","PostId":"53ae2057-2df2-42cd-adb8-35788e38a6e4","ResultId":"31fa82b2-ca09-49f1-a2de-e4f66f5a084d","PublishId":null,"IsPublished":false,"UseCookies":false,"UpdatedOn":"2018-10-28T08:53:40.3014604","CreatedAt":"2018-10-28T08:53:26.3237254","AllowAccessResult":false,"StoreIPAddress":false,"Theme":null,"Id":"320a4639-9f77-4dc4-87ed-17be6fb2c801"}];
export function getSurveys() {
    return api.surveyApi.getSurveys()
        .then(res => surveyStore.getSurveys(res))
        .catch(err => {
            console.error(err);
        });


    surveyStore.getSurveys(DATA)
    return Promise.resolve(DATA);
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


export function startSurvey(id, clientId, surveyName, groupId) {
    // console.log(survey)
    return api.surveyApi.startSurvey(id, clientId, surveyName, groupId)
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