'use strict';
var rn = require('random-number');
var authSevice = require('../services/authService');

var constants = require('../util/constants');
var commonServices = require('../common/commonServices');
var Data = require('../shared/models/data');
var UserData = require('../shared/models/user');
var UserDetails = require('../shared/models/userDetails');
var config = require('../config/userroles');
var moment = require('moment');
var jwt = require('jsonwebtoken');

exports.verifyEmailToken = function () {
	function verifyEmailToken(req, res) {
		var token = req.params.token;
		let data = jwt.decode(token, config.keys.secret);
		console.log(data);
		var isExpiredToken = false;
		var seconds = 1000;
		var d = new Date();
		var t= d.getTime();
		
		
		if (data.exp < Math.round(t / seconds)) {
		
		  isExpiredToken = true;
		}

		console.log(isExpiredToken);
	}
	return verifyEmailToken;
};

exports.authenticateUser = function () {
	function authenticateUser(req, res) {
		var data = req.body;
		var emailid = data.emailid;
		var password = data.password;
		var flag = false;
		var message = "";
		authSevice.authenticateUser(emailid,  password, function (result) {
			var data = new Data();
			var userDetails = new UserDetails();
			if (result instanceof Error) {
				flag = false;
				message = 'Oops! error occured. Try after some time';
			} else {
				var loginData = new UserData();
				commonServices.logger.debug('Message from Service', result.dataStatus.message);
				if (result.dataStatus.statusCode === commonServices.constants.OK_STATUS_CODE) {
					if(result.user.active === commonServices.constants.N){
						flag = false;
					message = 'your id has not been activated. Please contact Admin';
					var userDetail = result.user;
					loginData.name = userDetail.name;
					loginData.loginid = userDetail.login_id;
					loginData.registrationid = userDetail.registration_id;
					userDetails.user = loginData;
					}else{
						flag = true;
					
					var userDetail = result.user;
					console.log(userDetail);
					loginData.name = userDetail.name;
					loginData.loginid = userDetail.login_id;
					loginData.registrationid = userDetail.registration_id;
					 loginData.lehcenterid = userDetail.leh_centre_id;
					 loginData.status = userDetail.status;
					loginData.userroleid = userDetail.user_role_id;
					loginData.gender = userDetail.gender;
					loginData.role = userDetail.UserRole.role;
					loginData.profilephotopath = userDetail.profile_photo_path;
					loginData.profilephoto = userDetail.profile_photo;
					var token = jwt.sign(
						{
							name: userDetail.name,
							emailId: userDetail.email_id,
							mobileNo: userDetail.mobile_no,
							registrationId: userDetail.registration_id,
							userroleid : userDetail.user_role_id,
							clientid : userDetail.client_id,
						},
						commonServices.config.keys.secret,
						{ expiresIn: '2h' }
					);
				 
				
					loginData.token = 'Bearer ' + token;
					userDetails.user = loginData;
				}
				} else {

					if (result instanceof Data)
						flag = false;
					message = result.dataStatus.message;
				}
			}


		 

			if (flag) {
				authSevice.userAudit(loginData.userid,  commonServices.constants.SUCCESS, "Login Successfully",function (result) {
					if (result instanceof Error) {
						commonServices.logger.error('Error info', result);
					}else{
						commonServices.logger.debug('Auit updated');
					}
				});

				data.status = commonServices.constants.SUCCESS;
				data.statusCode = commonServices.constants.OK_STATUS_CODE;
				data.message = "Login Successfully";
				userDetails.dataStatus = data;
				res.status(200).json(userDetails);
			} else {
				authSevice.loginAudit(loginData.registrationid,  commonServices.constants.FAILED, message,function (result) {
					if (result instanceof Error) {
						commonServices.logger.error('Error info', result);
					}else{
						commonServices.logger.debug('Auit updated');
					}
				});
				data.message = message;
				data.status = constants.FAILED;
				data.statusCode = constants.ERROR_STATUS_CODE;
				userDetails.dataStatus = data;
				res.status(200).json(userDetails);
			}

		});
	}
	return authenticateUser;
};

exports.resetPassword = function () {
	function resetPassword(req, res) {
		var data = req.body;
		var registrationId = data.registrationid;
		var password = data.password;
		var passwordgenvalid = data.passwordgenvalid;
	 
		authSevice.resetPassword(registrationId,password,passwordgenvalid,function (result) {
		 var data = new Data();
			var userDetails = new UserDetails();
			 if (result instanceof Error) {
				var data = new Data();
				data.message = 'Oops! error occured. Try after some time';
				data.status = constants.FAILED;
				data.statusCode = constants.ERROR_STATUS_CODE;
				userDetails.dataStatus = data;
				res.status(500).json(userDetails);
			} else {
				var data = new Data();
				data.message = 'Data Saved Successfully';
				data.status = constants.SUCCESS;
				data.statusCode = constants.OK_STATUS_CODE;
				userDetails.dataStatus = data;
				res.status(200).json(userDetails);
			}
		});
	}
	return resetPassword;
};

