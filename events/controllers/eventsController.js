'use strict';

// Import Section

//Import Node Js libraries
var util = require('util');


//Import configuration
var config = require('../../config/userroles');

//Import constants
var constants = require('../../util/constants');

//Import shared services
var loggerService = require('../../shared/services/loggerservice');

//Import shared models
var User = require('../../shared/models/user');

//Import services
var eventService = require('../services/eventService');


//Import models
var Question = require('../models/question');
var Feedback = require('../models/feedback');


//Implementation Section
function customError(message) {
    this.name = this.constructor.name;
    this.message = message;

    //include stack trace in error object
    Error.captureStackTrace(this, this.constructor);
}

util.inherits(customError, Error);

var Data = require('../../shared/models/data');

exports.getEventById = function () {
    function getEventById(req, res) {
        console.log('>>>>>> getEventById >>>>');

        var eventId = req.params.eventId;
        var dataStatus = new Data();
        var id = new Data();

        eventService.getEventById(eventId, function (result) {
            console.log('>>>>>> getEventById >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getEventById;
};

exports.getAllEvents = function () {
    function getAllEvents(req, res) {
        console.log('>>>>>> getAllEvents >>>>');       

        eventService.getAllEvents(function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getAllEvents;
};

exports.getAllSessionsInEvent = function () {
    function getAllSessionsInEvent(req, res) {
        console.log('>>>>>> getAllSessionsInEvent >>>>');  
        var eventId = req.params.eventId;     

        eventService.getAllSessionsInEvent(eventId, function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getAllSessionsInEvent;
};

exports.getActiveSessionsInEvent = function () {
    function getActiveSessionsInEvent(req, res) {
        console.log('>>>>>> getActiveSessionsInEvent >>>>');  
        var eventId = req.params.eventId; 
        var sessionId = req.params.eventId;     

        eventService.getActiveSessionsInEvent(eventId, function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getActiveSessionsInEvent;
};

// Questions

exports.postQuestion = function () {
  function postQuestion(req, res) {
   var sessionId = req.params.sessionId;   
   var data = req.body;
    var dataStatus = new Data();

    var question = new Question();
    question.event_session_id = sessionId;
    question.question_status_id = data.question_status_id;
    question.user_id = data.user_id;
    question.question = data.question;

    eventService.postQuestion(question, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User question insertion fail';
        loggerService.logError('User question insertion fail', constants.FAILED, result);
        return res(result);
      } else {
        var data = new Data();
        data.message = 'Data Saved Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        res.status(200).json(data);
      }
    });


  }

  return postQuestion;
};

exports.getAllQuestionsForSession = function () {
    function getAllQuestionsForSession(req, res) {
        console.log('>>>>>> getAllQuestionsForSession >>>>');          
        var sessionId = req.params.sessionId;     

        eventService.getAllQuestionsForSession(sessionId, function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getAllQuestionsForSession;
};

exports.getAllQuestionsOfCurrentUser = function () {
    function getAllQuestionsOfCurrentUser(req, res) {
        console.log('>>>>>> getAllQuestionsOfCurrentUser >>>>');          
        var sessionId = req.params.sessionId; 
        var userId = req.params.userId;    

        eventService.getAllQuestionsOfCurrentUser(sessionId, userId, function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getAllQuestionsOfCurrentUser;
};

exports.editQuestion = function () {
  function editQuestion(req, res) {
   var sessionId = req.params.sessionId;   
   var questionId = req.params.questionId;
   var data = req.body;
    var dataStatus = new Data();

    var question = new Question();
    question.question_id = questionId;
    question.event_session_id = sessionId;
    question.question_status_id = data.question_status_id;
    question.user_id = data.user_id;
    question.question = data.question;

    eventService.editQuestion(question, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User question update fail';
        loggerService.logError('User question update fail', constants.FAILED, result);
        return res(result);
      } else {
        var data = new Data();
        data.message = 'Data Saved Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        res.status(200).json(data);
      }
    });


  }

  return editQuestion;
};

exports.deleteQuestion = function () {
  function deleteQuestion(req, res) {
   var sessionId = req.params.sessionId;   
   var questionId = req.params.questionId;
  
    var dataStatus = new Data();

    var question = new Question();
    question.question_id = questionId;
    question.event_session_id = sessionId;   

    eventService.deleteQuestion(question, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User question delete fail';
        loggerService.logError('User question delete fail', constants.FAILED, result);
        return res(result);
      } else {
        var data = new Data();
        data.message = 'Data Deleted Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        res.status(200).json(data);
      }
    });


  }

  return deleteQuestion;
};

//Feedback

exports.postFeedback = function () {
  function postFeedback(req, res) {   
   var data = req.body;
    var dataStatus = new Data();

    var feedback = new Feedback();
    feedback.question_id = data.question_id;   
    feedback.user_id = data.user_id;    

    eventService.postFeedback(feedback, function (result) {        
      if (result instanceof Error) {
        dataStatus.message = 'User feedback insertion fail';
        loggerService.logError('User feedback insertion fail', constants.FAILED, result);
        return res(result);
      } else {
        var data = new Data();
        data.message = 'Data Saved Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        res.status(200).json(data);
      }
    });

  }

  return postFeedback;
};

exports.getFeedbackCountForUserQuestion = function () {
    function getFeedbackCountForUserQuestion(req, res) {
        console.log('>>>>>> getFeedbackCountForUserQuestion >>>>');          
        var questionId = req.params.questionId;     

        eventService.getFeedbackCountForUserQuestion(questionId, function (result) {
           // console.log('>>>>>> getAllEvents >>>>', result)
            if (result instanceof Error) {
                dataStatus.message = 'Get event fail';
                loggerService.logError('Get event fail', constants.FAILED, result);
                return res(result);
            } else {
                var data = new Data();
                data.message = 'Data Saved Successfully';
                data.status = constants.SUCCESS;
                data.statusCode = constants.OK_STATUS_CODE;
                res.status(200).json(result);
            }
        });

    }
    return getFeedbackCountForUserQuestion;
};
