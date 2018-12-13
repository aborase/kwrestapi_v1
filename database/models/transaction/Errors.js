var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Errors = sequelize.define('errors', {
    errors_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    error_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    error_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    error_message:{
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
  return Errors;
};
