'use strict';

//Import Section

//Import Node Js libraries
var util = require('util');
var jwt = require('jsonwebtoken');
//Import configuration

//Import constants
var constants = require('../../util/constants');

//Import shared services
var loggerService = require('../../shared/services/loggerservice');
var commonServices = require('../../common/commonServices');
//Import shared models
var Data = require('../../shared/models/data');
var UserProfile = require('../../shared/models/userProfile');
var User = require('../../shared/models/user');
var UserDetails = require('../../shared/models/userDetails');
//Import services
var profileService = require('../services/profileService');

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
    var user = new User();
    var userProfile = new UserProfile();


    user.name = data.name;
    user.emailid = data.emailid;
    user.userid = data.userid;
    userProfile.affiliationid = data.profile.affiliationid;
    userProfile.designationid = data.profile.designationid;
    userProfile.specializationid = data.profile.specializationid;
    user.logintype = data.logintype;
    user.clientid = data.clientid;
    user.userroleid = data.userroleid;
    user.profile = userProfile;


    if(data.userid){
      profileService.updateProfileData(user, function (result) {

        if (result instanceof Error) {
          dataStatus.message = 'User profile insertion fail';
          loggerService.logError('User profile insertion fail', constants.FAILED, result);
          dataStatus.status = constants.FAILED;
          dataStatus.statusCode = constants.ERROR_STATUS_CODE;
          res.status(500).json(dataStatus);
        } else {
          getUserDetails(data.userid,req, res);
        }
      });
    
    }else{
      profileService.insertProfileData(user, function (result) {
        var userDetails = new UserDetails();
        if (result instanceof Error) {
          dataStatus.message = 'User profile insertion fail';
          loggerService.logError('User profile insertion fail', constants.FAILED, result);
          dataStatus.status = constants.FAILED;
          dataStatus.statusCode = constants.ERROR_STATUS_CODE;
          res.status(500).json(dataStatus);
        } else {
          var userRegData = new User();
          var token = jwt.sign(
            {
              name: result.name,
              emailId: result.emailid,
              mobileNo: result.mobileno
        
            },
            commonServices.config.keys.secret,
            { expiresIn: '2h' }
          );
        
          userRegData.name = result.name;
          userRegData.userroleid = user.userroleid;
          userRegData.userid= result.userid;
          userRegData.token = 'Bearer ' + token;
          console.log(userRegData);
          userDetails.user = userRegData;
          dataStatus.status = commonServices.constants.SUCCESS;
          dataStatus.statusCode = commonServices.constants.OK_STATUS_CODE;
          dataStatus.message = "Profile Updated Successfully";
          userDetails.dataStatus = dataStatus;
          res.status(200).json(userDetails);      
         
        }
      });
    }
  


  }

  return addUserProfile;
};

function getUserDetails(userid,req, res){

  profileService.getUserDataById(userid, function (result) {
    var userDetails = new UserDetails();
    if (result instanceof Error) {
      loggerService.logError('Get user profile fail', constants.FAILED, result);
      var data = new Data();
      data.message = 'Oops! error occured. Try after some time';
      data.status = constants.FAILED;
      data.statusCode = constants.ERROR_STATUS_CODE;
      userDetails.dataStatus = data;
      res.status(500).json(userDetails);
    } else {
      console.log(result);
      	var userRegData = new User();
        var token = jwt.sign(
          {
            name: result.name,
            emailId: result.emailid,
            mobileNo: result.mobileno
      
          },
          commonServices.config.keys.secret,
          { expiresIn: '2h' }
        );
        userRegData.name = result.name;
        userRegData.userroleid = result.user_role_id;
        userRegData.userid=userid;
        userRegData.token = 'Bearer ' + token;
        userDetails.user = userRegData;
        var data = new Data();
        data.status = commonServices.constants.SUCCESS;
        data.statusCode = commonServices.constants.OK_STATUS_CODE;
        data.message = "Login Successfully";
        userDetails.dataStatus = data;
        res.status(200).json(userDetails);
    }
  });


}
exports.getUserProfile = function () {
  function getUserProfile(req, res) {

    var userId = req.params.userId;
    var dataStatus = new Data();   
    var id = new Data();

    profileService.getUserProfileDataById(userId, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          id = result;
        //res.status(200).json(result);
      }
    });



    profileService.getUserAffiliationById(id.affiliation_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.affiliation = result.affiliation
          
        //res.status(200).json(result);
      }
    });
    profileService.getUserDesignationById(id.designation_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.designation = result.designation
          
        //res.status(200).json(result);
      }
    });
    profileService.getUserSpecializationById(id.specialization_id, function (result) {
      if (result instanceof Error) {
        dataStatus.message = 'Get user profile fail';
        loggerService.logError('Get user profile fail', constants.FAILED, result);
        return res(result);
      } else {
          dataStatus.specialization = result.specialization;
          
       // res.status(200).json(dataStatus);
      }
    });
    profileService.getUserSkipCountById(id.config_id, function (result) {
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

    profileService.updateProfileData(userProfile, function (result) {

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
    
    profileService.updateUserSkipRegristration(userProfile, function (result) {

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
