'use strict';
var router = require('express').Router();

var config = require('../../config/userroles'),
    allowOnly = require('../../util/routesHelper').allowOnly,
    allowAll = require('../../util/routesHelper').allowAll,
    registrationController = require('../controllers/registrationController');


var APIRoutes = function(passport,router) {
    // Post Routes.     
  
   /*  router.post("/",registrationController.addUserProfile());
    router.get("/:userId",registrationController.getUserProfile());
    router.put("/",registrationController.updateUserProfile());
    router.put("/registration/skip",registrationController.updateUserSkipRegristration());
    */
    
    return router;
};

module.exports = APIRoutes;

