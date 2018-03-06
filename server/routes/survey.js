'use strict';

const express = require('express');
const parser = require('../modules/parser');
const router = express.Router(); // eslint-disable-line new-cap
const Survey = require('../models/survey');
const survey = new Survey();
const boom = require('boom');
const mailer = require('../modules/mailer');
const accessKey = 'b4a00480f27c438596d828bc42da477a';
const publicEndpoint = 'http://surveyjs.io/api/MySurveys';
const publicOwnerId = 'keyopsmvp';
const axios = require('axios');
const publicPath = 'http://api.dxsurvey.com/api/Survey';
const privatePath = 'http://surveyjs.io/api/MySurveys';


const getAllSurveys = function (req, res, next) {
    // Survey.forge()
    //     .fetchAll()
    //     .then(response => {
    //         res.send(response);
    //     })
    //     .catch(err => {
    //         return next(err);
    //     })

    // return axios.get(`${privatePath}/getSurveyResults/${id}`, {
    //     params: {accessKey: accessKey}
    // })

    return axios.get(`${privatePath}/getActive`, {params: {ownerId: 'keyops', accessKey: accessKey}})
        .then(response => {

            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        })
};

const getSurveyById = function (req, res, next) {
    const {id} = req.params;

    // api/Survey/getSurvey?surveyId={surveyId}
    // Survey.forge().where({id})
    //     .fetch({require: true})
    //     .then(response => {
    //         res.send(response);
    //     })
    //     .catch(err => {
    //         return next(err);
    //     })

    return axios.get(`${publicPath}/getSurvey`, {params: {surveyId: id}})
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        })


};

const createSurvey = function (req, res, next) {
    const {name, data} = req.body;

    // console.log(name)
    // const newSurvey = {name, data};
    //
    // Survey.forge(survey.format(newSurvey))
    //     .save()
    //     .then(response => {
    //         res.send(survey.parse(response.attributes));
    //     })
    //     .catch(err => {
    //         if (err.name === 'ValidationError') {
    //             return next(boom.create(400, err.message));
    //         }
    //
    //         return next(err);
    //     });
    // api/MySurveys/create?ownerId={ownerId}&accessKey={accessKey}&name={name}
    return axios.get(`${privatePath}/create`, {
        params: {
            accessKey: accessKey,
            ownerId: 'keyops',
            name: name
        }
    })
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        })

};

const chnageJson = function (id, data) {

    return axios.post(`${privatePath}/changeJson`, {
        Json: data,
        Id: id
    }, {
        params: {accessKey: accessKey}
    })
}

const updateSurvey = function (req, res, next) {
    const {id} = req.params;
    const {data} = req.body;
    // console.log('wow1')
    // console.log(req.body)
    // const nextSurvey = {name, data, status};


    return chnageJson(id, data)
        .then(response => {

            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        });


    //
    // console.log(nextSurvey)
    //
    // Survey.forge()
    //     .where('id', id)
    //     .fetch()
    //     .then(response => {
    //
    //
    //         return response.save(survey.format(nextSurvey));
    //     })
    //     .then(response => {
    //         // console.log(JSON.stringify(response.data))
    //         // console.log(response.attributes)
    //
    //
    //         res.send(survey.parse(response.attributes));
    //
    //     })
    //     .catch(err => {
    //         if (err.name === 'ValidationError') {
    //             return next(boom.create(400, err.message));
    //         }
    //
    //         return next(err);
    //     });
};


const startSurvey = function (req, res, next) {
    const {id} = req.params;
    const {group, name, clientId} = req.query;


    return axios.get(`${publicPath}/getSurvey`, {params: {surveyId: id}})
        .then(response => {

            const survey = response.data;

            survey.pages = [{
                "name": "start_page",
                "elements": [{
                    type: "html",
                    html: "Please answer the question(s) on the next page. Your name is not attached to your response when presented to the industry sponsor. <br>" +
                    "<br>" +
                    "After you complete the question you can click submit and you can close your browser if you wish. <br>" +
                    "<br>" +
                    "Please let us know if there are any technical issues.<br>" +
                    "<br>" +
                    "Thanks again<br>" +
                    "The Keyops Team",
                    name: "start_survey"
                }]
            }, ...survey.pages];

            return chnageJson(id, JSON.stringify(survey));
        })


        .then(response => {
            return axios.get(`${privatePath}/publish/${id}`, {params: {generateNewId: true, accessKey: accessKey}})
        })
        .then(response => {
            return axios.get(`${privatePath}/makeResultPublic/${id}`, {
                params: {
                    makeResultPublic: true,
                    accessKey: accessKey
                }
            })
        })
        .then((response) => {

            return mailer.send(id, clientId, name, group)
                .then(() => response)

        })
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {

            if (err === 'no-group' || 'fail-send') {
                return res.status(400);
            }


            return next(err);
        })


}

const changeSurveyName = function (req, res, next) {
    const {id} = req.params;
    const {name} = req.query;

    return axios.get(`${privatePath}/changeName`, {params: {id: id, name: name, accessKey: accessKey}})
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        })

}
//
// const startSurvey = function (req, res, next) {
//     const {id} = req.params;
//     // const {name, data, status} = req.body;
//     const nextSurvey = {status:'running'};
//
//     console.log(nextSurvey)
//
//     Survey.forge()
//         .where('id', id)
//         .fetch()
//         .then(response => {
//             return response.save(survey.format(nextSurvey));
//         })
//         .then(response => {
//             // console.log(JSON.stringify(response))
//             mailer.send('contact@crm4you.me', response.attributes);
//             res.send(survey.parse(response.attributes));
//         })
//         .catch(err => {
//             if (err.name === 'ValidationError') {
//                 return next(boom.create(400, err.message));
//             }
//
//             return next(err);
//         });
// };


const deleteSurvey = function (req, res, next) {
    const {id} = req.params;

    Survey.forge().where('id', id)
        .destroy()
        .then(() => {
            res.json({message: 'Survey Sucessfully Deleted'});
        })
        .catch(err => {
            next(err);
        });


};


const getSurveyResults = function (req, res, next) {
    const {id} = req.params;
    let results;
    let survey;

    return axios.get(`${privatePath}/getSurveyResults/${id}`, {
        params: {accessKey: accessKey}
    })
        .then(response => results = response.data)
        .then(response => axios.get(`${publicPath}/getSurvey`, {params: {surveyId: id}}))
        .then(response => survey = response.data)
        .then(() => {
            let data = parser.parseResults(results.Data, survey)
            data.totalResults = results.ResultCount;
            // data.totalResults = results.ResultCount;
            res.json(data);
        })
        .catch(err => {
            next(err);
        });


};

const sendTestEmail = function (req, res, next) {

        const {id} = req.params;
        const {group, name} = req.query;

        return mailer.send(id, name, group)
            .then((response) => {
                res.json(response);
            })
            .catch(err => {
                next(err);
            });


    }
;

module.exports = {
    getAllSurveys,
    getSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    startSurvey,
    getSurveyResults,
    changeSurveyName,
    sendTestEmail
}


