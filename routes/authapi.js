'use strict';
var router = require('express').Router();

var config = require('../config/userroles'),
    allowOnly = require('../util/routesHelper').allowOnly,
    allowAll = require('../util/routesHelper').allowAll,
    authController = require('../controllers/authController');


var APIRoutes = function(passport,router) {
   router.get("/verifyemailtoken/:token",authController.verifyEmailToken());

  
    
    return router;
};

module.exports = APIRoutes;
