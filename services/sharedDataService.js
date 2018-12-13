'use strict';
var commonServices = require('../common/commonServices');
var constants = require('../util/constants');
var moment = require('moment');
var Promise = require('bluebird');
var SharedDataService = {};
var loggerService = require('./loggerservice');

SharedDataService.getUserRoles = function (callback) {
  commonServices.db.UserRole.findAll({
    where: {
      active: "Y"
    }

  }).then(function (userroles) {
    callback(userroles);
  }).catch(function (err) {

    loggerService.logError('getUserRoles', constants.FAILED, err);
    callback(err);
  });

};

SharedDataService.getMasterData = function (callback) {
  const countries = commonServices.db.Country.findAll({
    where: {
      active: 'Y'
    }
  });

  const affiliation = commonServices.db.Affiliation.findAll({
    where: {
      active: 'Y'
    }
  });



  const researchInterest = commonServices.db.ResearchInterest.findAll({
    where: {
      active: 'Y'
    }
  });

  const stream = commonServices.db.Stream.findAll({
    where: {
      active: 'Y'
    }
  });


  Promise
    .all([countries, affiliation, ,researchInterest,stream]).then(function (responses) {
      callback(responses);
    }).catch(function (err) {
      loggerService.logError('getCities', constants.FAILED, err);
      callback(err);
    });

};


SharedDataService.getCities = function (countryId, callback) {
  commonServices.db.Country.findAll({
    where: {
      country_id: countryId
    },
    attributes: ['country_id', 'country', 'prefindex'],
    include: [
      {
        model: commonServices.db.State,
        attributes: ['state_id', 'state', 'prefindex'],
        include: [
          {
            model: commonServices.db.City,
            attributes: ['city_id', 'city', 'prefindex']
          }
        ]
      }
    ]
  }).then(function (country) {
    callback(country);
  }).catch(function (err) {
    loggerService.logError('getCities', constants.FAILED, err);
    callback(err);
  });

};


module.exports = SharedDataService;