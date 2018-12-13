var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var LogMessage = sequelize.define('log_message', {
   log_message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    query: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    underscored: true
  });
  return LogMessage;
};
