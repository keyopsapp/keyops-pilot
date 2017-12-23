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

const updateSurvey = function (req, res, next) {
    const {id} = req.params;
    const {data} = req.body;
    // console.log('wow1')
    // console.log(req.body)
    // const nextSurvey = {name, data, status};


    return axios.post(`${privatePath}/changeJson`, {
        Json: data,
        Id: id
    }, {
        params: {accessKey: accessKey},
    })
        .then(response => {

            res.json(response.data);
        })
        .catch(err => {
            return next(err);
        })


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


    return axios.get(`${privatePath}/publish/${id}`, {params: {generateNewId: true, accessKey: accessKey}})
        .then(response => {

            res.json(response.data);
        })
        .catch(err => {
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
// const startSurvey = function (req, res, next) {
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


module.exports = {
    getAllSurveys,
    getSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    startSurvey,
    getSurveyResults,
    changeSurveyName
}


