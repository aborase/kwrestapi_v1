var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('mst_city', {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false
    },
    prefindex: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue:99
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue :'Y'
    }
  },
  {
    underscored: true
  });
  return City;
};
