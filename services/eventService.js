'use strict';
var commonServices = require('../common/commonServices');

var UserData = require('../models/user');
var Data = require('../models/data');
var constants = require('../util/constants');
var loggerService = require('../services/loggerservice');
var UserDetails = require('../models/userDetails');
var event = require('../models/event');

var jwt = require('jsonwebtoken');
var moment = require('moment');
var Promise = require('bluebird');
const Op = commonServices.db.Sequelize.Op;

var EventService = {};

EventService.getEventById = function (eventId, callback) {

    commonServices.db.event_mst.findOne({
        event_id: eventId
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getEventById', constants.FAILED, err);
        callback(err);
    });

};

EventService.getAllEvents = function (callback) {
    commonServices.db.event_mst.findAll({
        where: {
            active: 'Y'
        },
        include: [
            {
                model: commonServices.db.eventtype_mst
            },
            {
                model: commonServices.db.venue_mst
            },
        ],
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getAllEvents', constants.FAILED, err);
        callback(err);
    });

};

EventService.getAllSessionsInEvent = function (eventId, callback) {
    commonServices.db.eventsessions_mst.findAll({
        where: {
            event_id: eventId
        },
        include: [
            {
                model: commonServices.db.event_mst
            },
            {
                model: commonServices.db.orator_mst
            },
        ],
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getAllSessionsInEvent', constants.FAILED, err);
        callback(err);
    });

};

EventService.getActiveSessionsInEvent = function (eventId, callback) {
    commonServices.db.eventsessions_mst.findAll({
        where: {
            event_id: eventId,
             active: 'Y'
        },
        include: [
            {
                model: commonServices.db.event_mst
            },
            {
                model: commonServices.db.orator_mst
            },
        ],
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getActiveSessionsInEvent', constants.FAILED, err);
        callback(err);
    });

};

//Questions

EventService.postQuestion = function (question, callback) {
    let insertValues = { event_session_id: question.event_session_id,  question_status_id: question.question_status_id,
                          user_id: question.user_id,  question: question.question    };
    console.log('insertValues is:',insertValues);
    commonServices.db.question.create(
		insertValues
		).then(function (result) {
           // console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('postQuestion', constants.FAILED, err);
			callback(err);
		});

};

EventService.getAllQuestionsForSession = function (sessionId, callback) {
    commonServices.db.question.findAll({
        where: {
            event_session_id: sessionId
           
        },
        include: [
            {
                model: commonServices.db.eventsessions_mst
            },
            {
                model: commonServices.db.questionstatus_mst
            }
        ],
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getAllQuestionsForSession', constants.FAILED, err);
        callback(err);
    });

};

EventService.getAllQuestionsOfCurrentUser = function (sessionId, userId, callback) {
    commonServices.db.question.findAll({
        where: {
            event_session_id: sessionId,
            user_id: userId
           
        },
        include: [
            {
                model: commonServices.db.eventsessions_mst
            },
            {
                model: commonServices.db.questionstatus_mst
            }
        ],
    }
    ).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getAllQuestionsOfCurrentUser', constants.FAILED, err);
        callback(err);
    });

};

EventService.editQuestion = function (question, callback) {
     let updateValues = { event_session_id: question.event_session_id,  question_status_id: question.question_status_id,
                          user_id: question.user_id,  question: question.question    };
    // console.log('insertValues is:',updateValues);
    commonServices.db.question.update(
		updateValues,
		{
			where: { question_id: question.question_id }
		}
		).then(function (result) {
            console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('editQuestion', constants.FAILED, err);
			callback(err);
		});

};

EventService.deleteQuestion = function (question, callback) {
        // console.log('insertValues is:',updateValues);
    commonServices.db.question.destroy(		
		{
            where: {question_id: question.question_id}
		}
		).then(function (result) {
            console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('deleteQuestion', constants.FAILED, err);
			callback(err);
		});

};

//Feedback

EventService.postFeedback = function (feedback, callback) {
    let insertValues = { question_id: feedback.question_id,  user_id: feedback.user_id };
    console.log('insertValues is:',insertValues);
    commonServices.db.feedback.create(
		insertValues
		).then(function (result) {
           // console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('postQuestion', constants.FAILED, err);
			callback(err);
		});

};

EventService.getFeedbackCountForUserQuestion = function (questionId, callback) {

    commonServices.db.feedback.findAndCountAll({
        
            question_id: questionId
         
        }).then(function (result) {

        callback(result);
    }).catch(function (err) {
        loggerService.logError('getFeedbackCountForUserQuestion', constants.FAILED, err);
        callback(err);
    });

};



module.exports = EventService;