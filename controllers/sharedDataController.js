'use strict';
var fs = require('fs');
var portscanner = require('portscanner');
var url = require('url');
var sharedDataService = require('../master/services/masterDataService');
var Country = require('../master/models/country');
var State = require('../master/models/state');
var City = require('../master/models/city');
//var RandomNumber = require('../model/randomnumber');
var Promise = require('bluebird');
var rn = require('random-number');
var Data = require('../shared/models/data');
var constants = require('../util/constants');


//var ServerStatus = require('../model/serverStatus');
//var ServerStatusDetails = require('../model/serverStatusDetail');

var UserRole = require('../shared/models/userRole');
var UserRoleDetails = require('../shared/models/userRoleDetails');

var MasterDetails = require('../master/models/masterDetails');



var User = require('../shared/models/user');
const IncomingForm = require('formidable').IncomingForm;

exports.getRandomNumber = function () {
  function getRandomNumber(req, res) {
    var rn = require('random-number');
    var gen = rn.generator({
      min: 1000
      , max: 9999
      , integer: true
    })
    var number = gen();
    var randomNumer = new RandomNumber();
    randomNumer.number = number;
    res.status(200).json(randomNumer);
  }
  return getRandomNumber;
}



exports.getMasterData = function () {
  function getMasterData(req, res) {
 
    sharedDataService.getMasterData( function (result) {
      var masterDetails = new MasterDetails();
      if (result instanceof Error) {
        var data = new Data();
        data.message = 'Oops! error occured. Try after some time';
        data.status = constants.FAILED;
        masterDetails.statusCode = constants.ERROR_STATUS_CODE;
        masterDetails.dataStatus = data;
        res.status(500).json(masterDetails);
      } else {
       var countries = result[0];
       var affiliation = result[1];
       var phdSubject = result[2];
       var researchInterest = result[3];
       var stream = result[4];
/* 
        var userRoleArray = [];
        result.forEach(function (role, index) {
          var userRole = new UserRole();
          userRole.userroleid = role.user_role_id;
          userRole.role = role.role;

          userRoleArray.push(userRole);
        }); */

        var data = new Data();
        data.message = 'Data fetched Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

       // masterDetails.dataStatus = data;
        //masterDetails.userroles = userRoleArray;
        res.status(200).json(result);
      }
    });
  }
  return getMasterData;
},



exports.upload = function () {
  function upload(req, res) {
    var form = new IncomingForm();
    var loginId = '';
    var users = []
    form.on('field', function (name, field) {
      loginId = field;
    });
    form.on('file', (field, file) => {
      var oldpath = file.path;
      var path = "upload/users/photos/";
      var newpath = path + file.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          throw err;
        }
        var user = new User();
        user.loginid = loginId;
        user.profilephotopath = path;
        user.profilephoto = file.name;
        users.push(user);
        //  res.write('File uploaded and moved!');
        //res.end();
      });
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
    });
    form.on('end', () => {
      // Update database table;
      sharedDataService.updateProfilePhotos(users, function (result) {
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

    });
    form.parse(req);
    //  res.status(200).json(randomNumer);
  }
  return upload;
}

exports.getCities = function () {
  function getCities(req, res) {
    var countryId = req.params.countryId;
    sharedDataService.getCities(countryId, function (result) {
      var cities = result;
      var errors = cities && cities.errors;
      if (errors) {
        res.status(500).json(cities);
      } else {
        var countries = [];
        cities.forEach(function (country, index) {
          var countryTemp = new Country();
          countryTemp.countryId = country.country_id;
          countryTemp.country = country.country;
          countryTemp.prefIndex = country.prefindex;

          var states = [];
          country.States.forEach(function (state, index) {
            var stateTemp = new State();
            stateTemp.stateId = state.state_id;
            stateTemp.state = state.state;
            stateTemp.prefIndex = state.prefindex;

            var cities = [];
            state.Cities.forEach(function (city, index) {
              var cityTemp = new City();
              cityTemp.cityId = city.city_id;
              cityTemp.city = city.city;
              cityTemp.prefIndex = city.prefindex;
              cities.push(cityTemp);
            });
            stateTemp.cities = cities;
            states.push(stateTemp);
          });
          countryTemp.states = states;
          countries.push(countryTemp);
        });

        res.status(200).json(countries);
      }
    });
  }
  return getCities;
},

 
exports.getUserRoles = function () {
  function getUserRoles(req, res) {

    sharedDataService.getUserRoles(function (result) {
      var userRoleDetails = new UserRoleDetails();
      if (result instanceof Error) {
        var data = new Data();
        data.message = 'Oops! error occured. Try after some time';
        data.status = constants.FAILED;
        data.statusCode = constants.ERROR_STATUS_CODE;
        userRoleDetails.dataStatus = data;
        res.status(500).json(userRoleDetails);
      } else {


        var userRoleArray = [];
        result.forEach(function (role, index) {
          var userRole = new UserRole();
          userRole.userroleid = role.user_role_id;
          userRole.role = role.role;

          userRoleArray.push(userRole);
        });

        var data = new Data();
        data.message = 'Data fetched Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;

        userRoleDetails.dataStatus = data;
        userRoleDetails.userroles = userRoleArray;
        res.status(200).json(userRoleDetails);
      }
    });
  }
  return getUserRoles;
};



exports.getServerStatus = function () {
  function getServerStatus(req, res) {
    var serverStatusDetails = new ServerStatusDetails();
    // Checks the status of a single port
    var data = req.body;
    var serverStatusArray = [];
    var units = [];
    data.forEach(function (server) {
      var serverStatus = new ServerStatus();
      serverStatus.serverid = server.serverid;
      serverStatus.servername = server.servername;
      serverStatus.serverurl = server.serverurl;
      serverStatusArray.push(serverStatus);
    });



    const { protocol, host, hostname, port } = url.parse('http://localhost:8080');


    // var serverstatus = list();
    list(serverStatusArray)
      .then(result => {

        var index = 0;
        result.forEach(function (element) {
          serverStatusArray[index].status = element;
          index++;
        });
        var data = new Data();
        data.message = 'Data fetched Successfully';
        data.status = constants.SUCCESS;
        data.statusCode = constants.OK_STATUS_CODE;
        serverStatusDetails.dataStatus = data;
        serverStatusDetails.serverstatus = serverStatusArray;
        res.status(200).json(serverStatusDetails);
      }
      ).catch(e => {
        console.error(e);

        var data = new Data();
        data.message = 'Oops! error occured. Try after some time';
        data.status = constants.FAILED;
        data.statusCode = constants.ERROR_STATUS_CODE;
        res.status(500).json(data);
      }
      )
    // res.status(200).json(serverstatus);
  }
  return getServerStatus;
}

async function list(serverStatusArray) {

  var serverstatus = '';
  var requests = [];
  serverStatusArray.forEach(function (server) {
    const { protocol, host, hostname, port } = url.parse(server.serverurl);

    requests.push(apiRequest(hostname, port));
  });

  /*   var p1 = apiRequest('192.168.0.168','31607');
    var serverStatusArray = [];
  //this one will fail
  var p2 = apiRequest();
  
  var p3 = apiRequest('127.0.0.1','31607');
   */
  await Promise.all(requests)
    .then(function (res) {
      serverstatus = res;

      res.forEach(function (element) {

      });
      // console.log('Promise.all', res);
    })
    .catch(function (err) {
      throw err;
      //console.error('err', err);
    });

  return serverstatus;
}


function request() {


  return new Promise(function (resolve, reject) {
    portscanner.checkPortStatus(31607, '127.0.0.1', function (error, status) {
      // Status is 'open' if currently in use or 'closed' if available
      resolve(status)

    });
  })
}



function apiRequest(serverAddress, port) {
  return new Promise(function (resolve, reject) {
    portscanner.checkPortStatus(port, serverAddress, function (error, status) {
      // Status is 'open' if currently in use or 'closed' if available
      resolve(status)

    });
    //our fake api simply returns the string passed as the 'url'
    /*  if (url) {
         resolve(url);
     } else {
         //if no url is passed to the function, it will fail
         reject('apiRequest failed!');
     } */
  })
    .catch(function (err) {
      //return error;
      return err;
    });
}

