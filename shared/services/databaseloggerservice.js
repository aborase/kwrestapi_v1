'use strict';
var commonServices = require('../../common/commonServices');
var constants = require('../../util/constants');
var moment = require('moment');
var Promise = require('bluebird');
var DatabaseLoggerService = {};

DatabaseLoggerService.logError = function (query, errortype, message) {


    var currentDateNumber = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
    var errorno = currentDateNumber.replace(/[-:.T]/g, '');
    var errormessage = message;
    var query = query;
  
    var currentDate = moment().format("YYYY-MM-DD");
    commonServices.db.sequelize.transaction(function (t) {
      return commonServices.db.Errors.create({
        error_no: errorno,
        error_message: errormessage,
        error_type: errortype,
        query: query,
        created_at: currentDate,
        updated_at: currentDate
      }, { transaction: t });
    }).then(function (error) {
      commonServices.logger.log('info', 'saved data');
    }).catch(function (err) {
      commonServices.logger.log('error', JSON.stringify(error, ["message", "arguments", "type", "name", "stack"]));
  
    });
  
  };
  
  DatabaseLoggerService.logMessageToDB = function (query, messagetype, message) {
  
  
    var currentDateNumber = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
    var messageno = currentDateNumber.replace(/[-:.T]/g, '');
  
    var currentDate = moment().format("YYYY-MM-DD");
    commonServices.db.sequelize.transaction(function (t) {
      return commonServices.db.LogMessage.create({
        message_no: messageno,
        message_type: messagetype,
        message: message,
        query: query,
        created_at: currentDate,
        updated_at: currentDate
      }, { transaction: t });
    }).then(function (error) {
      commonServices.logger.log('info', 'saved logMessage to database');
    }).catch(function (err) {
      commonServices.logger.log('error', JSON.stringify(err, ["message", "arguments", "type", "name", "stack"]));
      //  callback(err);
    });
  
  };
  
module.exports = DatabaseLoggerService;