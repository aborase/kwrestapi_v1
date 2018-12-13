var logger = require('../config/logger');
var DatabaseLoggerService = require('./databaseloggerservice');
var constants = require('../util/constants');
var LoggerService = {};

LoggerService.logError = function (query, errortype, error) {
	DatabaseLoggerService.logError(query, errortype, JSON.stringify(error, ["message"]));
	logger.log('error', JSON.stringify(error, ["message", "arguments", "type", "name", "stack"]));
};



LoggerService.logMessage = function (logtoDB,query, messagetype,message) {
	logger.log('info', query + '::' + message);
	if(messagetype === constants.DEBUG){
		logger.log('debug', query + '::' + messagetype + '>>' + message);
	} else {
		logger.log('info', query + '::' + messagetype + '>>' + message);
	}
	if(logtoDB === constants.Y){
		DatabaseLoggerService.logMessageToDB(query, messagetype, message);
	}
};

module.exports = LoggerService;
