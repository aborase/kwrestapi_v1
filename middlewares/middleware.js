'use strict';

/// NPM dependencies.
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
   
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    http = require('http'),
    cors = require('cors'),
    path = require('path');

var router = express.Router();
var winston = require('../config/logger');
const options=cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      allowedHeaders: ["Content-Type", "Authorization"]
    };

//use cors middleware
router.use(cors(options));

//enable pre-flight
router.options("*", cors(options));

// App related modules.
var hookJWTStrategy = require('../util/passportStrategy');

// Initializations.
var app = express();

// Parse as urlencoded and json.
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// Hook up the HTTP logger.
app.use(morgan('combined'));

// Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// Set the static files location.
//app.use('/angular',express.static(__dirname + '/../../public'));
//app.use('/resources',express.static(__dirname + '/../../resources'));


//app.use('/angular', express.static('public'))


// Bundle API routes.
//app.use('/api', require('../routes/api')(passport,router));
// app.use('/api/rest/dashboard', require('../dashboard/routes/dashboardapi')(passport,router));

//app.use('/api/rest/auth', require('../authentication/routes/authapi')(passport,router));
//app.use(express.static('public'))

//app.use('/', index);
// Catch all route.
//app.get('*', function(req, res) {
  //  res.sendFile(path.join(__dirname + '/../../public/index.html'));
//});

//Rest API Authorization router
app.use('/kw/api/v1/auth', require('../auth/routes/authapi')(passport,router));

//Rest API Registration router
app.use('/kw/api/v1/registration', require('../registration/routes/registerationapi')(passport,router));


//Rest API Admin router
app.use('/kw/api/v1/admin', require('../routes/shareddataapi')(passport,router));

/* //Rest API OTP router
app.use('api/v1/otp', require('../routes/shareddataapi')(passport,router));

//Rest API SMS router
app.use('api/v1/sms', require('../routes/shareddataapi')(passport,router));
 */
//Rest API Email router
app.use('/kw/api/v1/email', require('../routes/shareddataapi')(passport,router));

//Rest API Profile router
app.use('/kw/api/v1/profile', require('../profile/routes/profileapi')(passport,router));

//Rest API Master router
app.use('/kw/api/v1/master', require('../master/routes/masterdataapi')(passport,router));

//Rest API Community router
app.use('/kw/api/v1/community', require('../routes/shareddataapi')(passport,router));

//Rest API Events router
app.use('/kw/api/v1/events', require('../routes/shareddataapi')(passport,router));

//Rest API Conferences router
app.use('/kw/api/v1/conference', require('../routes/shareddataapi')(passport,router));

//Rest API Notification router
app.use('/kw/api/v1/notification', require('../routes/shareddataapi')(passport,router));
/* 

app.use('/api/rest/users', require('../routes/usermgmtapi')(passport,router));


//Events
//app.use('/api/rest/events', require('../routes/eventsapi')(passport,router));

//User registration
app.use('/api/rest/profile', require('../routes/registerationapi')(passport,router));
 */


//module.exports = APIRoutes;
module.exports = app;
