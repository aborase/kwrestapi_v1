// Application configuration.
'use strict';
//var logger = require('logger');
var logger = require('./logger');
var Sequelize = require('sequelize');
var config = module.exports;

config.db = {
    user: 'root',
    password: 'password',
    name: 'knowledge_weaver'
};
const Op = Sequelize.Op;
config.db.details = {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: Op, // use Sequelize.Op
    dialectOptions:{
    multipleStatements: true
  },
    logging: (sql) => {
       if( logger.level === 'debug'){
      logger.debug(`[${new Date()}] ${sql}`);
       }
    }
};

