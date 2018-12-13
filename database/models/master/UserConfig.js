var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserConfig_MST = sequelize.define('mst_user_config', {
    config_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registration_skip_count: {
      type: DataTypes.INTEGER,
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
  return UserConfig_MST;
};
