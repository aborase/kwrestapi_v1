'use strict';
var commonServices = require('../common/commonServices');

var UserData = require('../models/user');
var Data = require('../models/data');
var constants = require('../util/constants');
var loggerService = require('../services/loggerservice');
var UserDetails = require('../models/userDetails');
var UserProfile = require('../models/userProfile');

var jwt = require('jsonwebtoken');
var moment = require('moment');
var Promise = require('bluebird');
const Op = commonServices.db.Sequelize.Op;

var UserRegistrationService = {};

UserRegistrationService.insertProfileData = function (userProfile, callback) {
    let insertValues = { user_id: userProfile.userid, affiliation_id: userProfile.affiliationid, 
                         designation_id: userProfile.designationid,  specialization_id: userProfile.specializationId};
    // console.log('insertValues is:',insertValues);
    commonServices.db.UserProfile.create(
		insertValues
		).then(function (result) {
           // console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('insertProfileData', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.updateProfileData = function (userProfile, callback) {
    let updateValues = { user_id: userProfile.userid, affiliation_id: userProfile.affiliationid, stream_id: userProfile.streamid,
                         designation_id: userProfile.designationid,  qualification_id: userProfile.qualificationid};
    // console.log('insertValues is:',updateValues);
    commonServices.db.UserProfile.update(
		updateValues,
		{
			where: { user_id: userProfile.userid }
		}
		).then(function (result) {
            console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('updateProfileData', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserProfileDataById = function (userId, callback) {
    
    commonServices.db.UserProfile.findOne({  
			user_id: userId
		}
		).then(function (result) {		
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserProfileDataById', constants.FAILED, err);
			callback(err);
		});

};


UserRegistrationService.getUserAffiliationById = function (affiliationId, callback) {
    
    commonServices.db.affiliation_mst.findOne({  
			affiliation_id: affiliationId
		}
		).then(function (result) {
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserAffiliationById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserStreamById = function (streamId, callback) {
    
    commonServices.db.Stream.findOne({  
			stream_id: streamId
		}
		).then(function (result) {
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserStreamById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserDesignationById = function (designationId, callback) {    
    commonServices.db.Designation.findOne({  
			designation_id: designationId
		}
		).then(function (result) {           
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserDesignationById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserQualificationById = function (qualificationId, callback) {
    
    commonServices.db.Qualification.findOne({  
			qualification_id: qualificationId
		}
		).then(function (result) {
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserQualificationById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserSpecializationById = function (specializationId, callback) {
    
    commonServices.db.specialization_mst.findOne({  
			specialization_id: specializationId
		}
		).then(function (result) {
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserSpecializationById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.getUserSkipCountById = function (config_id, callback) {    
    commonServices.db.UserConfig_MST.findOne({  
			config_id: config_id
		}
		).then(function (result) {
            
			callback(result);
		}).catch(function (err) {
			loggerService.logError('getUserSkipCountById', constants.FAILED, err);
			callback(err);
		});

};

UserRegistrationService.updateUserSkipRegristration = function (userProfile, callback) {
    let updateValues = {registration_skip_count: userProfile.skipCount};
     console.log('insertValues is:',updateValues);
    commonServices.db.UserConfig_MST.update(
		updateValues,
		{
			where: { user_id: userProfile.userid }
		}
		).then(function (result) {
            console.log('response is:',result);
			callback(result);
		}).catch(function (err) {
			loggerService.logError('updateUserSkipRegristration', constants.FAILED, err);
			callback(err);
		});

};


module.exports = UserRegistrationService;