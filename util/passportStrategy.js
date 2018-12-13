'use strict';
var loggerService = require('../services/loggerservice');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var db = require('../database/services/databaseService'),
    config = require('../config/userroles');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;
    passport.use(new JwtStrategy(options, function (JWTPayload, callback) {
        db.User.findOne({ where: { user_id: JWTPayload.userId } })
            .then(function (user) {
                if (!user) {
                    callback(null, false);
                    return;
                }
                callback(null, user);
            }).catch(function (err) {
                // Log error to database and Error table
                loggerService.logError('hookJWTStrategy', constants.SEVERE, err);
            });
    }));
}


module.exports = hookJWTStrategy;
