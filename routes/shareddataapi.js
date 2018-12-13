'use strict';
var  sharedDataController = require('../controllers/sharedDataController');


var APIRoutes = function(passport,router) {
     router.get("/cities/:countryId",sharedDataController.getCities());
     router.get("/masterdata",sharedDataController.getMasterData());
       return router;
};

module.exports = APIRoutes;
