'use strict';
var router = require('express').Router();

var config = require('../config/userroles'),
    allowOnly = require('../util/routesHelper').allowOnly,
    allowAll = require('../util/routesHelper').allowAll,
    userRegistrationController = require('../controllers/userRegistrationController');


var APIRoutes = function(passport,router) {
    // Post Routes.     
  
    router.post("/",userRegistrationController.addUserProfile());
    router.get("/:userId",userRegistrationController.getUserProfile());
    router.put("/",userRegistrationController.updateUserProfile());
    router.put("/registration/skip",userRegistrationController.updateUserSkipRegristration());
   
    
    return router;
};

module.exports = APIRoutes;

