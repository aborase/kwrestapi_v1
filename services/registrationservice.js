'use strict';
var commonServices = require('../common/commonServices');

var UserData = require('../models/user');
var Data = require('../models/data');
var constants = require('../util/constants');
var loggerService = require('../services/loggerservice');
var UserDetails = require('../models/userDetails');

var jwt = require('jsonwebtoken');
var moment = require('moment');
var Promise = require('bluebird');
const Op = commonServices.db.Sequelize.Op;

var RegistrationService = {};

RegistrationService.authenticateUser = function (emailid,  password,  callback) {
	var potentialUser;
	
		potentialUser = {
			where: {
				email_id: emailid,
			},
			include: [
				{
					model: commonServices.db.UserRole,

				},

			]
		};
	


	
		commonServices.db.User.findOne(potentialUser).then(function (login) {
			var data = new Data();
			var userDetail = new UserDetails();
			if (login != null) {
				login.comparePasswords(password, function (error, isMatch) {
					if (isMatch && !error) {
						data.message = "Registration id / password valid";
						data.status = commonServices.constants.SUCCESS;
						data.statusCode = commonServices.constants.OK_STATUS_CODE;
						userDetail.user = login;
						userDetail.dataStatus = data;
						callback(userDetail)
					} else {

						data.status = commonServices.constants.FAILED;
						data.statusCode = commonServices.constants.ERROR_STATUS_CODE;
						data.message = "Registration id / password do not match";
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
             console.log(error);
			// Log error to database and Error table
			loggerService.logError('authenticateUser', commonServices.constants.SEVERE, error);
			callback(error);
		});
	}
	


RegistrationService.verifyUser = function (emailid, mobileno,  callback) {

	let whereClause = {};
	whereClause['active'] = commonServices.constants.Y;
	if(emailid){
		whereClause['email_id'] = emailid;
	}
	if(mobileno){
		whereClause['mobile_no'] = mobileno;
	}
	commonServices.db.User.findOne({
		    where : whereClause,
		}).then(function (result) {
			callback(result);
		}).catch(function (err) {
			loggerService.logError('verifyUser', constants.FAILED, err);
			callback(err);
		});

};


RegistrationService.updateStatus = function (statusid, userid, callback) {
	let updateValues = { status_id: statusid };
	commonServices.db.User.update(
		updateValues,
		{
			where: { user_id: userid }
		}).then(function (result) {
			callback(result);
		}).catch(function (err) {
			loggerService.logError('updateStatus', constants.FAILED, err);
			callback(err);
		});

};

RegistrationService.registerUser = function (loginData, callback) {

	var savedData = new UserData();
	let addValues = { client_id: 1, status_id: 1, user_role_id: loginData.userroleid, active: commonServices.constants.N };
	if (loginData.name) {
		addValues['name'] = loginData.name;
	}
	
	if (loginData.mobileno) {
		addValues['mobile_no'] = loginData.mobileno;
	}
	if (loginData.emailid) {
		addValues['email_id'] = loginData.emailid;
	}
	if (loginData.password) {
		addValues['password'] = loginData.password;
	}
	if (loginData.logintype) {
		addValues['login_type'] = loginData.logintype;
	}


	commonServices.db.sequelize.transaction(function (t) {

		return commonServices.db.User.create(
			addValues,
			{ transaction: t }
		).then(function (login) {
			var registrationIdPrefix = '12' + loginData.clientid + loginData.userroleid;

			login.user_registration_id = registrationIdPrefix + login.get(commonServices.databaseConstants.USER_ID);
			savedData.userid = login.get(commonServices.databaseConstants.USER_ID);
			savedData.userregistrationid = login.user_registration_id;
			savedData.emailid = loginData.emailid;
			savedData.name = loginData.name;
			savedData.mobileno = loginData.mobileno;
			return login.save({ transaction: t }
			).then(function (result) {
				loggerService.logMessage(constants.Y, 'registerUser', constants.SUCCESS, 'Data Saved for user with mobile no : ' + loginData.mobileno);
				callback(savedData);
			}).catch(function (err) {
				// Log error to database and Error table
				loggerService.logError('registerUser', constants.FAILED, err);
				callback(err);
			});
		});

	});
}

RegistrationService.getUserByName = function (searchname, callback) {
	commonServices.db.User.findAll({
		where: {
			name: {
				[Op.like]: '%' + searchname + '%'
			},
			active: 'Y'

		},
		include: [
			{
				model: commonServices.db.UserRole
			}],

	}).then(function (user) {
		callback(user);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('getUserByName', constants.FAILED, err);
		callback(err);
	});
}

RegistrationService.getStatus = function (callback) {
	commonServices.db.LectureStatus.findAll({
		where: {
			active: 'Y'
		},
	}).then(function (lectureStatususer) {
		callback(lectureStatususer);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('getStatus', constants.FAILED, err);
		callback(err);
	});
}

RegistrationService.getUserByRegistrationId = function (registrationId, callback) {
	commonServices.db.User.findAll({
		where: {
			registration_id: registrationId,

		},
		include: [
			{
				model: commonServices.db.UserRole
			}],
	}).then(function (user) {
		callback(user);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('getUserByRegistrationId', constants.FAILED, err);
		callback(err);
	});


}



RegistrationService.getActiveUsers = function (callback) {
	commonServices.db.Login.findAll({
		where: {
			active: commonServices.constants.Y,
			user_role_id: {
				[Op.ne]: 7
			},


		},
		include: [
			{
				model: commonServices.db.UserRole
			}],


	}).then(function (user) {
		callback(user);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('getActiveUsers', constants.FAILED, err);
		callback(err);
	});
}

RegistrationService.getNonActiveUsers = function (callback) {
	commonServices.db.User.findAll({
		where: {
			active: commonServices.constants.N,
			user_role_id: {
				[Op.ne]: 7
			},
		},
		include: [
			{
				model: commonServices.db.UserRole
			}],

	}).then(function (user) {
		callback(user);
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('getNonActiveUsers', constants.FAILED, err);
		callback(err);
	});
}

RegistrationService.resetPassword = function (loginData, callback) {
	let updateValues = { password: loginData.password, };
	commonServices.db.User.update(
		updateValues,
		{
			where: { login_id: loginData.login_id }
		}).then((result) => {
			commonServices.logger.log('info', 'password changed : ' + loginData.login_id);
			callback(loginData);
		}).catch(function (err) {
			// Log error to database and Error table
			loggerService.logError('resetPassword', constants.FAILED, err);
			callback(err);
		});
}

RegistrationService.activateUser = function (userDetails, callback) {
	var currentDate = moment().format("YYYY-MM-DD");
	commonServices.db.sequelize.transaction(function (t) {
		return Promise.map(userDetails, function (userDetail) {
			let updateValues = { active: commonServices.constants.Y, active_from: currentDate };
			commonServices.db.User.update(
				updateValues,
				{ where: { login_id: userDetail.loginId } }, { transaction: t });

		});
	}).then(function (result) {
		callback('sucess');
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('activateStudent', constants.FAILED, err);
		callback(err);
	});

}

RegistrationService.deAactivateUser = function (userDetails, callback) {
	var currentDate = moment().format("YYYY-MM-DD");
	commonServices.db.sequelize.transaction(function (t) {
		return Promise.map(userDetails, function (userDetail) {
			let updateValues = { active: commonServices.constants.N, deactive_from: currentDate };
			commonServices.db.Login.update(
				updateValues,
				{ where: { login_id: userDetail.loginId } }, { transaction: t });

		});
	}).then(function (result) {
		callback('sucess');
	}).catch(function (err) {
		// Log error to database and Error table
		loggerService.logError('deAactivateUser', constants.FAILED, err);
		callback(err);
	});
}



module.exports = RegistrationService;
