'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const exampleRoutes = require('./example');
const surveyRoutes = require('./survey');

router.route('/example')
  .get(exampleRoutes.getAllExamples)
  .post(exampleRoutes.createExample)

router.route('/example/:id')
  .get(exampleRoutes.getExampleById)
  .put(exampleRoutes.updateExample)
  .delete(exampleRoutes.deleteExample)


router.route('/survey')
    .post(surveyRoutes.createSurvey)
    .get(surveyRoutes.getAllSurveys)

router.route('/survey/:id')
    .get(surveyRoutes.getSurveyById)
    .put(surveyRoutes.updateSurvey)
    .delete(surveyRoutes.deleteSurvey)

router.route('/survey/:id/start')
    .get(surveyRoutes.startSurvey)

router.route('/survey/:id/results')
    .get(surveyRoutes.getSurveyResults)

module.exports = router;
