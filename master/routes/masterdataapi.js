'use strict';
var  masterDataController = require('../controllers/masterDataController');


var APIRoutes = function(passport,router) {
     router.get("/cities/:countryId",masterDataController.getCities());
     router.get("/masterdata",masterDataController.getMasterData());
       return router;
};

module.exports = APIRoutes;
