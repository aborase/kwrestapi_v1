'use strict';

//Sample file structure

//Import Section
//Import Node Js libraries
//Import configuration
//Import constants
//Import shared services
//Import shared models
//Import services
//Import models
//Implementation Section



// Import Section


//Import Node Js libraries
var jwt = require('jsonwebtoken');
var util = require('util');
var async = require('async');

//Import configuration
var config = require('../../config/userroles');

//Import constants
var constants = require('../../util/constants');
var kwSystemCodes = require('../../util/kwsystemcodes');

//Import shared services
var commonServices = require('../../common/commonServices');
var loggerService = require('../../shared/services/loggerservice');

//Import shared models
var Data = require('../../shared/models/data');
var User = require('../../shared/models/user');
var UserDetails = require('../../shared/models/userDetails');


//Import services
var authSevice = require('../services/authService');

var registrationService = require('../../registration/services/registrationservice');




//Implementation Section
function customError(message) {
	this.name = this.constructor.name;
	this.message = message;
  
	//include stack trace in error object
	Error.captureStackTrace(this, this.constructor);
  }
  
  util.inherits(customError, Error);
  
  

exports.verifyEmailToken = function () {
	function verifyEmailToken(req, res) {
		console.log('hello');
		var token = req.params.token;
		let data = jwt.decode(token, config.keys.secret);
		console.log(data);
		var isExpiredToken = false;
		var seconds = 1000;
		var d = new Date();
		var t = d.getTime();


		if (data.exp < Math.round(t / seconds)) {

			isExpiredToken = true;
		}

		console.log(isExpiredToken);
	}
	return verifyEmailToken;
};

/**
  * @desc Check if user entered mobile no exist in system. 
  * Check if user session still exist. prompt for otp if session expired or first time login
  *       
  * @return res 
  * success message with request to generate otp
  * failure - service fail error
  * */
exports.verifyUserByMobileNo = function () {
	function verifyUserByMobileNo(req, res) {
		var data = req.body;
		const logintype = data.logintype;
		console.log(logintype);
		const mobileno = data.mobileno;
		authSevice.verifyUserByMobileNo(mobileno, function (result) {


			var userDetails = new UserDetails();
			var userRegData = new User();

			userRegData.logintype = logintype;
			userRegData.mobileno = mobileno;
			if (result instanceof Error) {
				var data = new Data();
				data.message = 'Oops! error occured. Try after some time';
				data.status = constants.FAILED;
				data.statusCode = constants.ERROR_STATUS_CODE;
				userDetails.dataStatus = data;
				res.status(500).json(userDetails);
			} else {

				var mobileNoExist = false;
				if (result) {
					if (result.mobile_no) {
						mobileNoExist = true;
						console.log('MobileNo Exist' + mobileNoExist);
						userRegData.name = result.name;
						
						userRegData.userid = result.user_id;
						userRegData.statusid = result.status_id;

					}

				}
				if (mobileNoExist) {
					console.log('MobileNo Exist' + mobileNoExist);
					userExist(req, res, userRegData);
				} else {
					console.log('MobileNo does not Exist' + mobileNoExist);
					userDoesNotExist(req, res, userRegData);

				}
			}
		});
	}

	return verifyUserByMobileNo;
}

/**
  * @desc If user already registered with the system return success
  *       
  * @return res - success or failure
*/

function userExist(req, res, userRegData) {

	var userDetails = new UserDetails();
	var token = jwt.sign(
		{
			name: userRegData.name,
			emailId: userRegData.emailid,
			mobileNo: userRegData.mobileno

		},
		commonServices.config.keys.secret,
		{ expiresIn: '2h' }
	);


	userRegData.token = 'Bearer ' + token;
	userDetails.user = userRegData;
	var data = new Data();
	data.status = commonServices.constants.SUCCESS;
	data.statusCode = commonServices.constants.OK_STATUS_CODE;
	data.message = "Login Successfully";
	userDetails.dataStatus = data;
	res.status(200).json(userDetails);

}


/**
  * @desc If user not registered then  - 1. If login option is social(facebook and google) register user
  * 	*  2. If login option is OTP and user provided mobileno the send message to user to request otp.
  *       
  * @return res - success or failure
*/

function userDoesNotExist(req, res, userRegData) {


	var dataStatus = new Data();
	if (userRegData.logintype === 'OTP') {
		registerMobileNo(req, res, userRegData);
	}
}



function registerMobileNo(req, res, userRegData) {
  
	var dataStatus = new Data();
	var userDetails = new UserDetails();
	var user= new User();
  
	const tasks = [
	  function registerMobileNo(cb){
		userRegData.userroleid = config.userRoles.user;
		userRegData.clientid = 1;
		registrationService.registerUser(userRegData, function (result) {
			if (result instanceof Error) {
				dataStatus.message = 'Can not register mobile No';
				var err = new customError('Can not register mobile No');
				return cb(err);
		
			} else {
				return cb(null, result);
			}
		  });
		

	 
	
	  },
	  function updateStatus(resultData, cb) {
		var userid = resultData.userid;
		console.log(resultData);
		user.userid = userid;
		var status = 2;
		registrationService.updateStatus(status, userid, function (result) {
  
		  if (result instanceof Error) {
			dataStatus.message = 'Status not changed';
			loggerService.logError('Status not changed', constants.FAILED, result);
			return cb(result);
		  } else {
			return cb(null, resultData);
		  }
		});
  
	  },
	];
	async.waterfall(tasks, (err, results) => {
	  if (err) {
		loggerService.logError('Can not register mobile No', constants.FAILED, err);
		dataStatus.status = constants.FAILED;
		dataStatus.statusCode = constants.ERROR_STATUS_CODE;
		return res.status(500).json(dataStatus);
	   //return next(err);
	  }
	  userDetails.user = user;
	  dataStatus.kwsystemcode = kwSystemCodes.OTP_REQUEST;
	  dataStatus.status = constants.SUCCESS;
	  dataStatus.statusCode = constants.OK_STATUS_CODE;
	  userDetails.dataStatus= dataStatus;
	  return res.status(200).json(userDetails);
  
	})
  
  }  

