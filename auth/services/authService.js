'use strict';

// Import Section


//Import Node Js libraries
var moment = require('moment');

//Import shared services

var commonServices = require('../../common/commonServices');
var loggerService = require('../../shared/services/loggerservice');


//Import shared models

var Data = require('../../shared/models/data');
var UserDetails = require('../../shared/models/userDetails');


//Implementation Section

var AuthService = {};
AuthService.authenticateUser = function (emailid, password, callback) {
	var potentialUser;

	potentialUser = {
		where: { email_id: emailid },
		include: [
			{
				model: commonServices.db.UserRole,

			},
			

		]
	};

	commonServices.db.User.findOne(potentialUser).then(function (user) {
		var data = new Data();
		var userDetail = new UserDetails();
		if (user != null) {
			user.comparePasswords(password, function (error, isMatch) {
				if (isMatch && !error) {
					data.message = "Email id / password valid";
					data.status = commonServices.constants.SUCCESS;
					data.statusCode = commonServices.constants.OK_STATUS_CODE;
					userDetail.user = login;
					userDetail.dataStatus = data;
					callback(userDetail)
				} else {

					data.status = commonServices.constants.FAILED;
					data.statusCode = commonServices.constants.ERROR_STATUS_CODE;
					data.message = "Email id / password do not match";
					userDetail.dataStatus = data;
					commonServices.logger.debug('message', data.message);
					callback(userDetail)
				}
			});
		} else {

			data.status = commonServices.constants.FAILED;
			data.statusCode = commonServices.constants.ERROR_STATUS_CODE;
			data.message = "User Does not exist. Please register and try again";
			userDetail.dataStatus = data;
			callback(userDetail)
			commonServices.logger.debug('message', data.message);

		}
	}).catch(function (error) {

		// Log error to database and Error table
		loggerService.logError('authenticateUser', commonServices.constants.SEVERE, err);
		callback(error);
	});
}


AuthService.resetPassword = function (emailid, password, callback) {
	let updateValues = { password: password};
	commonServices.db.User.update(
		updateValues,
		{
			where: { email_id: emailid }
		}).then((result) => {
			callback(result);
		}).catch(function (err) {
			// Log error to database and Error table
			loggerService.logError('resetPassword', commonServices.constants.FAILED, err);
			callback(err);
		});
}


AuthService.userAudit = function (userid, status, reason, callback) {
	var currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
	commonServices.db.sequelize.transaction(function (t) {

		return commonServices.db.UserAudit.create({
			user_id: userid,
			status: status,
			reason: reason
		}, { transaction: t })

	}).then(function (result) {
		callback(result);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('resetPassword', commonServices.constants.FAILED, err);
		callback(err);
	});
}

AuthService.verifyUserByMobileNo = function (mobileno,  callback) {

	let whereClause = {};
	whereClause['active'] = commonServices.constants.Y;

	if(mobileno){
		whereClause['mobile_no'] = mobileno;
	}
	commonServices.db.User.findOne({
		    where : whereClause,
		}).then(function (result) {
			callback(result);
		}).catch(function (err) {
			console.log(err);
			loggerService.logError('verifyUserByMobileNo', commonServices.constants.FAILED, err);
			callback(err);
		});

};


module.exports = AuthService;
