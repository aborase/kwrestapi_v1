var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define('mst_state', {
    state_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state:{
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
  return State;
};
