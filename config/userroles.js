// Application configuration.
'use strict';
//var logger = require('logger');
var logger = require('./logger');
var config = module.exports;

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

config.restAPI_prod = {
    emailAPI: 'http://192.168.0.167/api/sharedservices/common/email/',    
    smsAPI: 'http://192.168.0.167/api/sharedservices/common/sms/',  
};

config.restAPI_test = {
    emailAPI: 'http://192.168.0.167/api/sharedservices/common/email/',    
    smsAPI: 'http://192.168.0.167/api/sharedservices/common/otp/',  
};

config.smsUserId = {
     userId : 'Akshay'

}
config.restservice = {
    authenticate: 'authenticate',
    send: 'send',
   
};

config.server = {
    ipconfig: 'local' // Not anymore...
};

var userRoles = config.userRoles = {
    user: 1,     // ...001
    tester: 2,     // ...010
    admin: 3,     // ...011
    superuser: 4     // ...100
   
};

config.accessLevels = {
    user: userRoles.user | userRoles.tester | userRoles.admin | userRoles.superuser,   
    tester:  userRoles.tester | userRoles.admin | userRoles.superuser ,                      
    admin:  userRoles.admin | userRoles.superuser,                                     
    superuser:   userRoles.superuser
   
};
