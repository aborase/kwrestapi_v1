'use strict';
var registrationService = require('../services/registrationservice');
var constants = require('../util/constants');
var Client = require('node-rest-client').Client;
var UserDetails = require('../shared/models/userDetails');
var loggerService = require('../shared/services/loggerservice');
var User = require('../shared/models/user');
var UserDetails = require('../shared/models/userDetails');
var async = require('async');
var commonServices = require('../common/commonServices');
var config = require('../config/userroles');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var emailExistence = require('email-existence');
var Data = require('../shared/models/data');

var util = require('util');

function customError(message) {
        this.name = this.constructor.name;
        this.message = message;

        //include stack trace in error object
        Error.captureStackTrace(this, this.constructor);
}

util.inherits(customError, Error);





exports.resetPassword = function () {
  function resetPassword(req, res) {
    var data = req.body;
    var loginData = new UserData();
    loginData.login_id = data.loginid;
    loginData.password = data.password;

    if (!loginData.password) {
      var data = new Data();
      data.message = 'Please provide  password.';
      data.status = constants.DATA_NOT_AVAILABLE;
      data.statusCode = constants.NO_DATA_STATUS_CODE;
      res.status(500).json(data);
    } else {
      registrationService.resetPassword(loginData, function (result) {
        if (result instanceof Error) {
          var data = new Data();
          data.message = 'Oops! error occured. Try after some time';
          data.status = constants.FAILED;
          data.statusCode = constants.ERROR_STATUS_CODE;
          res.status(500).json(data);
        } else {
          var data = new Data();
          data.message = 'Data Saved Successfully';
          data.status = constants.SUCCESS;
          data.statusCode = constants.OK_STATUS_CODE;

          res.status(200).json(data);
        }
      });
    }
  }
  return resetPassword;
};





exports.verifyUser = function () {
  function verifyUser(req, res) {
    var data = req.body;

    const name = data.name;
    const mobileno = data.mobileno;
    const emailid = data.emailid;
    const password = data.password;
    const logintype = data.logintype;


    registrationService.verifyUser(emailid, mobileno, function (result) {


      var userDetails = new UserDetails();
      var userRegData = new User();
      if (name) {
        userRegData.name = name;
      }
      if (mobileno) {
        userRegData.mobileno = mobileno;
      }

      if (emailid) {
        userRegData.emailid = emailid;
      }

      if (logintype) {
        userRegData.logintype = logintype;
      }

      if (result instanceof Error) {
        var data = new Data();
        data.message = 'Oops! error occured. Try after some time';
        data.status = constants.FAILED;
        data.statusCode = constants.ERROR_STATUS_CODE;
        userDetails.dataStatus = data;
        res.status(500).json(userDetails);
      } else {

        var mobileNoExist = false;
        var emailIdExist = false;
        // res.status(200).json(result);
        if(result){
        if (result.email_id) {
          emailIdExist = true;

        }
        if (result.mobile_no) {
          mobileNoExist = true;
          console.log('Emailid Exist' + emailIdExist);
          console.log('MobileNo Exist' + mobileNoExist);
          userRegData.name = result.name;
          userRegData.password = result.password;
          userRegData.userid = result.user_id;
          userRegData.statusid = result.status_id;
  
        }

      }
        if (emailIdExist || mobileNoExist) {

          userExist(req, res, userRegData, password);
        } else {
          userDoesNotExist(req, res, userRegData);

        }
      }
    });
  }

  return verifyUser;
}

/**
  * @desc If user already registered with the system return success
  *       
  * @return res - success or failure
*/

function userExist(req, res, userRegData, password) {
  if (userRegData.logintype === 'classic') {
    authenticateUser(userRegData, password, req, res);
  } else {
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


}


/**
  * @desc If user not registered then  - 1. If login option is social(facebook and google) register user
  *  2. if login option is classic and user provided email and password then register email and send verfication email.
  *  3. If login option is OTP and user provided mobileno the send message to user to request otp.
  *       
  * @return res - success or failure
*/

function userDoesNotExist(req, res, userRegData) {

  registrationService.registerUser(userRegData, function (result) {
    if (result instanceof Error) {
      console.log(result);
      loggerService.logError('User not registered ', constants.FAILED, result);
      var data = new Data();
      data.message = 'Could not register user';
      data.status = constants.DATA_NOT_AVAILABLE;
      data.statusCode = constants.NO_DATA_STATUS_CODE;
      res.status(500).json(data);

    } else {
      var dataStatus = new Data();
      if (userRegData.logintype === 'OTP' && userRegData.mobileno) {
        dataStatus.message = 'New User. request OTP';
        dataStatus.status = constants.SUCCESS;
        dataStatus.statusCode = constants.OK_STATUS_CODE;

        return res.status(200).json(dataStatus);
      }
      if (userRegData.logintype === 'classic' && userRegData.emailid) {
        sendEmailData(userRegData, req, res);
      } else {
        dataStatus.message = 'User Registered';
        dataStatus.status = constants.SUCCESS;
        dataStatus.statusCode = constants.OK_STATUS_CODE;

        return res.status(200).json(dataStatus);
      }

    }
  });

}

function sendEmailData(userRegData, request, res) {

  var dataStatus = new Data();


  const tasks = [
    function isEmailExist(cb){
      emailExistence.check(userRegData.emailid, function(error, response){
        console.log('res: '+response);
        if(response){
          return cb(null, response);
        
      }else{
        dataStatus.message = 'Email does not exist';
        var err = new customError('Email does not exist');
        return cb(err);
      }
    });
   
  },
    function sendEmail(result,cb) {
      var token = jwt.sign(
        {
          name: userRegData.name,
          emailId: userRegData.emailid,
          mobileNo: userRegData.mobileno
        },
        commonServices.config.keys.secret,
        { expiresIn: '2h' }
      );
      var args = {
        data: {
          "name": userRegData.name,
          "email": userRegData.emailid,
          "token": token
        },
        headers: { "Content-Type": "application/json" }
      };
      console.log(args);
      var restApi = config.restAPI_test.emailAPI + config.restservice.authenticate;
      dataStatus.message = 'Mail Succefully send';
      var client = new Client();
      var req = client.post(restApi, args, function (data, response) {
        //console.log(data);
       // console.log(response.statusCode);
        if (response.statusCode != 200) {
          //console.log(response);
          dataStatus.message = 'Could not send email';
          var err = new customError('Could not send email');
          loggerService.logError('Can not send emailid' + userRegData.emailid, constants.FAILED,err);
        
          return cb(err);
        } else {

          //res.status(200).json(dataStatus);
          return cb(null, {
            status: response.statusCode,
            loginData: userRegData
          });
        }
      }).on('error', function (err) {
        return cb(err);
      });
      req.on('requestTimeout', function (req) {
        dataStatus.message = 'request has expired';
        commonServices.logger.log('error', 'request has expired');

        req.abort();
      });

      req.on('responseTimeout', function (res) {

        dataStatus.message = 'response has expired';
        commonServices.logger.log('error', 'response has expired');
        req.abort();
      });

      //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
      req.on('error', function (err) {
        dataStatus.message = err.message;
        commonServices.logger.log('error', JSON.stringify(error, ["message", "arguments", "type", "name", "stack"]));

        return cb(err);
      });

    },
    function updateStatus(resultData, cb) {
      var userid = resultData.loginData.userid;
      var status = 2;
      registrationService.updateStatus(status, userid, function (result) {

        if (result instanceof Error) {
          dataStatus.message = 'Status not changed';
          loggerService.logError('Status not changed', constants.FAILED, result);
          return cb(result);
        } else {
          return cb(null, result);
        }
      });

    },
  ];
  async.waterfall(tasks, (err, results) => {
    if (err) {
      loggerService.logError('Can not send email', constants.FAILED, err);
      dataStatus.status = constants.FAILED;
      dataStatus.statusCode = constants.ERROR_STATUS_CODE;
      return res.status(500).json(dataStatus);
     //return next(err);
    }

    dataStatus.status = constants.SUCCESS;
    dataStatus.statusCode = constants.OK_STATUS_CODE;

    return res.status(200).json(dataStatus);

  })

}


function authenticateUser(userRegData, password, req, res) {
  var match = false;
  var flag = false;
  if (userRegData != null) {

    registrationService.authenticateUser(userRegData.emailid, password, function (result) {

      if (result instanceof Error) {
        flag = false;
        message = 'Oops! error occured. Try after some time';
      } else {
        var loginData = new User();
        commonServices.logger.debug('Message from Service', result.dataStatus.message);
        if (result.dataStatus.statusCode === commonServices.constants.OK_STATUS_CODE) {
          flag = true;
          var data = new Data();
          var userDetails = new UserDetails();
          var userDetail = result.user;
		
					loginData.name = userDetail.name;
					loginData.userid = userDetail.user_id;
          loginData.emailid = userDetail.email_id;
          loginData.mobileno = userDetail.mobile_no;
					var token = jwt.sign(
						{
							name: userDetail.name,
              emailId: userDetail.email_id,
              userid: userDetail.user_id,
							mobileNo: userDetail.mobile_no,
						},
						commonServices.config.keys.secret,
						{ expiresIn: '2h' }
					);
				 
					console.log(loginData);
					loginData.token = 'Bearer ' + token;
					userDetails.user = loginData;

        } else {

          if (result instanceof Data)
            flag = false;
          message = result.dataStatus.message;
        }
        if (flag) {
         
  
          data.status = commonServices.constants.SUCCESS;
          data.statusCode = commonServices.constants.OK_STATUS_CODE;
          data.message = "Login Successfully";
          userDetails.dataStatus = data;
          res.status(200).json(userDetails);
        } else {
        
          data.message = message;
          data.status = constants.FAILED;
          data.statusCode = constants.ERROR_STATUS_CODE;
          userDetails.dataStatus = data;
          res.status(200).json(userDetails);
        }


      }
    });
  }
}
