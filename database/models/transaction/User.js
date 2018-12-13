var Sequelize = require('sequelize');
var config = require('../../../config/userroles');
var bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    user_registration_id: {
      type: DataTypes.STRING,
      allowNull: true
    },   

    name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    login_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
      password: {
       type: DataTypes.STRING,
       allowNull: true
     },

    mobile_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
   
    profile_photo_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Y'
    },
    active_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deactive_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      defaultValue: config.userRoles.User
    },
    deleted_at: DataTypes.DATE
  },
  {

    hooks: {
        beforeValidate: hashPassword
    },
    underscored: true
  });

  function hashPassword(user) {
      if(user.changed('password')) {
          return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
          });
      }
  }

  User.prototype.comparePasswords = function (password, callback) {  bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
  }
  return User;
};
