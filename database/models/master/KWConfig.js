var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var KWConfig = sequelize.define('mst_kw_config', {
    kw_config_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parametesr: {
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
  return KWConfig;
};
