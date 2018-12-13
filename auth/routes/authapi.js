'use strict';

var router = require('express').Router();

//Import Section

//Import config, router and controller
var config = require('../../config/userroles'),
    allowOnly = require('../../util/routesHelper').allowOnly,
    allowAll = require('../../util/routesHelper').allowAll,
    authController = require('../controllers/authController');

//Router functionality
var APIRoutes = function(passport,router) {
   router.get("/verifyemailtoken/:token",authController.verifyEmailToken());
   router.post("/verifyuserbymobileno",authController.verifyUserByMobileNo());
 
    
    return router;
};

module.exports = APIRoutes;
