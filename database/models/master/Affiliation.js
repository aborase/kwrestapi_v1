var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Affiliation_MST = sequelize.define('mst_affiliation', {
    affiliation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    affiliation: {
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
  return Affiliation_MST;
};
