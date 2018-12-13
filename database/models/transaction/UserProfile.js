var Sequelize = require('sequelize');
var config = require('../../../config/userroles');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var UserProfile = sequelize.define('user_profile', {
    user_profile__id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    affiliation_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stream_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    designation_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qualification_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    specialization_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },   
    config_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },  
    is_complete: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N'
    },     

    deleted_at: DataTypes.DATE
  },
  {
    underscored: true
  });

  return UserProfile;
};
