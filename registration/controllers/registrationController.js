'use strict';

//Import Section

//Import Node Js libraries
var util = require('util');

//Import configuration
//Import constants
var constants = require('../../util/constants');

//Import shared services
var loggerService = require('../../shared/services/loggerservice');

//Import shared models
var UserProfile = require('../../shared/models/userProfile');
var Data = require('../../shared/models/data');

//Import services
var registrationService = require('../services/registrationservice');
//Import models





//Implementation Section
function customError(message) {
  this.name = this.constructor.name;
  this.message = message;

  //include stack trace in error object
  Error.captureStackTrace(this, this.constructor);
}

util.inherits(customError, Error);



exports.addUserProfile = function () {
  function addUserProfile(req, res) {
    var data = req.body;
    var dataStatus = new Data();

    var userProfile = new UserProfile();
    userProfile.userid = data.userId;
    userProfile.affiliationid = data.affiliationId;
    userProfile.designationid = data.designationId;
    userProfile.specializationId = data.specializationId;
    //userProfile.streamid = data.streamId;    
    //userProfile.qualificationid = data.qualificationId;

    registrationService.insertProfileData(userProfile, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User profile insertion fail';
        loggerService.logError('User profile insertion fail', constants.FAILED, result);
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

  return addUserProfile;
};

exports.getUserProfile = function () {
  function getUserProfile(req, res) {

    var userId = req.params.userId;
    var dataStatus = new Data();   
    var id = new Data();

    registrationService.getUserProfileDataById(userId, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          id = result;
        //res.status(200).json(result);
      }
    });
    registrationService.getUserAffiliationById(id.affiliation_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.affiliation = result.affiliation
          
        //res.status(200).json(result);
      }
    });
     registrationService.getUserDesignationById(id.designation_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.designation = result.designation
          
        //res.status(200).json(result);
      }
    });
    registrationService.getUserSpecializationById(id.specialization_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.specialization = result.specialization;
          
       // res.status(200).json(dataStatus);
      }
    });
    registrationService.getUserSkipCountById(id.config_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.registration_skip_count = result.registration_skip_count;
          
        res.status(200).json(dataStatus);
      }
    });
    
  }

  return getUserProfile;
};

exports.updateUserProfile = function () {
  function updateUserProfile(req, res) {
    var data = req.body;
    var dataStatus = new Data();

    var userProfile = new UserProfile();    
    userProfile.userid = data.userId;
    if(data.affiliationId){
      userProfile.affiliationid = data.affiliationId;
    }
    if(data.designationId){
      userProfile.designationid = data.designationId;
    }
    if(data.qualificationId){
      userProfile.qualificationid = data.qualificationId;
    }

    registrationService.updateProfileData(userProfile, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User profile update fail';
        loggerService.logError('User profile update fail', constants.FAILED, result);
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

  return updateUserProfile;
};

exports.updateUserSkipRegristration = function () {
  function updateUserSkipRegristration(req, res) {
   
    var data = req.body;
    var dataStatus = new Data();
     console.log('>>>>> updateUserSkipRegristration>>>',data)
    var userProfile = new UserProfile();    
    userProfile.userid = data.userId;
    var count = data.skipCount
    userProfile.skipCount = --count;
    
    registrationService.updateUserSkipRegristration(userProfile, function (result) {

      if (result instanceof Error) {
        dataStatus.message = 'User skip count fail';
        loggerService.logError('User skip count fail', constants.FAILED, result);
        return res(result);
      } else {
        var data = new Data();
        data.message = 'Data Update Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        res.status(200).json(data);
      }
    });


  }

  return updateUserSkipRegristration;
};
