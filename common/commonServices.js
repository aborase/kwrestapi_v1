
const commonServices = {};
commonServices.db = require('../database/services/databaseService');
commonServices.config = require('../config/userroles');
//commonServices.errors = require('../shareddata/model/lehError');
commonServices.logger = require('../config/logger');
commonServices.databaseConstants = require('../util/databaseconstants');
commonServices.constants = require('../util/constants');

module.exports = commonServices;
