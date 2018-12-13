'use strict';
var router = require('express').Router();

var config = require('../../config/userroles'),
    allowOnly = require('../../util/routesHelper').allowOnly,
    allowAll = require('../../util/routesHelper').allowAll,
    profileController = require('../controllers/profileController');


var APIRoutes = function(passport,router) {
    // Post Routes.     
  
    router.post("/",profileController.addUserProfile());
    router.get("/:userId",profileController.getUserProfile());
    router.put("/",profileController.updateUserProfile());
    router.put("/registration/skip",profileController.updateUserSkipRegristration());
   
    
    return router;
};

module.exports = APIRoutes;

