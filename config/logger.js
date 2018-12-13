'use strict';
var appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: false,
    timestamp: tsFormat,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    colorize: false,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
      })
  ),
  
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    timestamp: tsFormat,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
      })
  ),
    colorize: true,
  },
  console: {
    level: 'debug',
    timestamp: tsFormat,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// your centralized logger object
let logger = winston.createLogger({
  

  transports: [
    new (winston.transports.Console)(options.console),
     new (winston.transports.File)(options.errorFile),
    new (winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  logger.level = 'info';
  logger.info('Logging initialized at info level');
}


// create a stream object with a 'write' function that will be used by `morgan`
/* logger.stream = {
  write: function(message, level='info') {
    console.log('message1',message);
    if (typeof message === 'object'){
      message = JSON.stringify(message);
  }
  logger[level](message);
  },
}; */

/* 
logger.logMessage(message, level='info'){
  console.log('message2',message);
  if (typeof message === 'object'){
      message = JSON.stringify(message);
  }
  logger[level](message);
} */

/* logger.info("Env",env);
logger.warn("Env",env);
logger.debug("Env",env);
logger.error("Env",env);
logger.info('Hello world');
logger.warn('Warning message');
logger.debug('Debugging info'); */
module.exports =logger;
