var Sequelize = require('sequelize');
var config = require('../../../config/userroles');
var bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  var UserContactDetails = sequelize.define('user_contact_detail', {
    user_contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 9999
    },
    country_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 9999
    },
    state_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 9999
    },
    city_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleted_at: DataTypes.DATE

  },
    {
      underscored: true
    });

  return UserContactDetails;
};
