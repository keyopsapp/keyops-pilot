'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Survey = require('../models/survey');
const survey = new Survey();
const boom = require('boom');

const getAllSurveys = function (req, res, next) {
    Survey.forge()
        .fetchAll()
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            return next(err);
        })
};

const getSurveyById = function (req, res, next) {
    const {id} = req.params;

    Survey.forge().where({id})
        .fetch({require: true})
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            return next(err);
        })
};

const createSurvey = function (req, res, next) {
    const {name, data} = req.body;

    // console.log(name)
    const newSurvey = {name, data};

    Survey.forge(survey.format(newSurvey))
        .save()
        .then(response => {
            res.send(survey.parse(response.attributes));
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                return next(boom.create(400, err.message));
            }

            return next(err);
        });
};

const updateSurvey = function (req, res, next) {
    const {id} = req.params;
    const {name, data} = req.body;

    // console.log(req.body)
    const nextSurvey = {name, data};

    console.log(nextSurvey)

    Survey.forge()
        .where('id', id)
        .fetch()
        .then(response => {
            return response.save(survey.format(nextSurvey));
        })
        .then(response => {
            // console.log(JSON.stringify(response.data))
            // console.log(response.attributes)
            res.send(survey.parse(response.attributes));

        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                return next(boom.create(400, err.message));
            }

            return next(err);
        });
};

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


module.exports = {
    getAllSurveys,
    getSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey
}


