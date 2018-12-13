var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserAudit = sequelize.define('user_audit', {
    user_audit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    underscored: true
  });
  return UserAudit;
};
