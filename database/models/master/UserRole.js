var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var UserRole = sequelize.define('mst_user_role', {
    user_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false
    },

    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Y'
    }
  },
    {
      underscored: true
    });
  return UserRole;
};
