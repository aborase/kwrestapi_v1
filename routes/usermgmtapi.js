'use strict';
var router = require('express').Router();

var config = require('../config/userroles'),
    allowOnly = require('../util/routesHelper').allowOnly,
    allowAll = require('../util/routesHelper').allowAll,
    userController = require('../controllers/userController');


var APIRoutes = function(passport,router) {
    // Post Routes.
   
    
    // router.post("/userbynameormobileno",userController.getUserByNameOrMobileNo());
    router.post("/resetpassword",userController.resetPassword());
   // router.post("/activedeactiveusers",userController.activeDeactiveUsers());
    //router.post("/userbyregistrationid",userController.getUserRegistrationId());
    // router.post("/registeruser",userController.registerUser());
    router.post("/verifyuser",userController.verifyUser());


    
    
   
    //Get Routes
    // router.get("/activeandnonactiveusers/:flag",userController.getActiveAndNonActiveUsers());
   // router.get("/allusersbyrole/:role",userController.getAllUsersByRole());
    
    
    return router;
};

module.exports = APIRoutes;
