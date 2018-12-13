'use strict';
var router = require('express').Router();

var config = require('../config/userroles'),
    allowOnly = require('../util/routesHelper').allowOnly,
    allowAll = require('../util/routesHelper').allowAll,
    eventsController = require('../controllers/eventsController');


var APIRoutes = function(passport,router) {
    // Post Routes.         
    router.get("/:eventId",eventsController.getEventById());
    router.get("/",eventsController.getAllEvents());

    //session
    router.get("/:eventId/sessions",eventsController.getAllSessionsInEvent());
    router.get("/:eventId/sessions/active",eventsController.getActiveSessionsInEvent());

    //Question
    router.post("/sessions/:sessionId/questions",eventsController.postQuestion());
    router.get("/sessions/:sessionId/questions",eventsController.getAllQuestionsForSession());
    router.get("/sessions/:sessionId/questions/:userId",eventsController.getAllQuestionsOfCurrentUser());
    router.put("/sessions/:sessionId/questions/:questionId",eventsController.editQuestion());
    router.delete("/sessions/:sessionId/questions/:questionId",eventsController.deleteQuestion());

    //Feedback
    router.post("/feedback",eventsController.postFeedback());
    router.get("/feedback/question/:questionId",eventsController.getFeedbackCountForUserQuestion());
    
   
    
    return router;
};

module.exports = APIRoutes;

