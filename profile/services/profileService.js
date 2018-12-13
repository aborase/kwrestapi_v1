'use strict';
var commonServices = require('../../common/commonServices');

var constants = require('../../util/constants');
var loggerService = require('../../shared/services/loggerservice');

var User = require('../../shared/models/user');
var profileService = {};





profileService.insertProfileData = function (user, callback) {

	
	let addUserValues = { client_id: user.clientid, status_id: 1, user_role_id: user.userroleid, active: commonServices.constants.Y };
	if (user.name) {
		addUserValues['name'] = user.name;
	}

	if (user.mobileno) {
		addUserValues['mobile_no'] = user.mobileno;
	}
	if (user.emailid) {
		addUserValues['email_id'] = user.emailid;
	}

	if (user.logintype) {
		addUserValues['login_type'] = user.logintype;
	}

	
	var savedData = new User();

	return commonServices.db.sequelize.transaction(function (t) {
		return commonServices.db.User.create(
			addUserValues
		, {transaction: t}).then(function (newuser) {

			var registrationIdPrefix = '12' + 1 + user.userroleid;
          
			newuser.user_registration_id = registrationIdPrefix + newuser.get(commonServices.databaseConstants.USER_ID);
			savedData.userid = newuser.get(commonServices.databaseConstants.USER_ID);
			savedData.userregistrationid = newuser.user_registration_id;
			savedData.emailid = user.emailid;
			savedData.name = user.name;
			savedData.logintype = user.logintype;
			savedData.mobileno = user.mobileno;
			return newuser.save({ transaction: t }
			).then(function (result) {
				let updateUserValues = {
					
					user_id: result.user_id,affiliation_id: user.profile.affiliationid,designation_id: user.profile.designationid, specialization_id: user.profile.specializationid, active: commonServices.constants.Y
				};
			
				return commonServices.db.UserProfile.create(
					updateUserValues
				, {transaction: t});
		});
	  }).then(function (result) {
		commonServices.logger.log('info', 'Data Saved for user with mobile no : ' );
		callback(savedData);
	  }).catch(function (err) {
		commonServices.logger.log('error', JSON.stringify(err, ["message", "arguments", "type", "name", "stack"]));
		callback(err);
	  });
	});
}


profileService.updateProfileData = function (user, callback) {
	return commonServices.db.sequelize.transaction(function (t) {

		let updateUser = { };
	if (user.name) {
		updateUser['name'] = user.name;
	}


		return commonServices.db.User.update(
			updateUser,{
				returning: true,	where: { user_id: user.userid },
				
			},{ checkExistance: true }
		, {transaction: t}).then(function (updateduser) {
			let updateValues = {
				affiliation_id: user.profile.affiliationid, stream_id: user.profile.streamid,
			   designation_id: user.profile.designationid, qualification_id: user.profile.qualificationid,specialization_id: user.profile.specializationid
		   };
			return commonServices.db.UserProfile.update(
				updateValues,{
					returning: true,where: { user_id: user.userid }
				}, { checkExistance: true }
			, {transaction: t})
	
			});
}).then(function(result) {
	
		console.log('response is:', result);
		callback(result);
	}).catch(function (err) {
		loggerService.logError('updateProfileData', constants.FAILED, err);
		callback(err);
	});

};


profileService.getUserDataById = function (userid, callback) {
	
	commonServices.db.User.findOne({ where: {
		user_id: userid
	  }
		
	}
	).then(function (result) {

		callback(result);
	}).catch(function (err) {
		loggerService.logError('getUserProfileDataById', constants.FAILED, err);
		callback(err);
	});

};


profileService.getUserProfileDataById = function (userId, callback) {

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


profileService.getUserAffiliationById = function (affiliationId, callback) {

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

profileService.getUserStreamById = function (streamId, callback) {

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

profileService.getUserDesignationById = function (designationId, callback) {
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

profileService.getUserQualificationById = function (qualificationId, callback) {

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

profileService.getUserSpecializationById = function (specializationId, callback) {

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

profileService.getUserSkipCountById = function (config_id, callback) {
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

profileService.updateUserSkipRegristration = function (userProfile, callback) {
	let updateValues = { registration_skip_count: userProfile.skipCount };
	console.log('insertValues is:', updateValues);
	commonServices.db.UserConfig_MST.update(
		updateValues,
		{
			where: { user_id: userProfile.userid }
		}
	).then(function (result) {
		console.log('response is:', result);
		callback(result);
	}).catch(function (err) {
		loggerService.logError('updateUserSkipRegristration', constants.FAILED, err);
		callback(err);
	});

};


module.exports = profileService;