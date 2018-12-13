var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('mst_country', {
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    country: {
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
      defaultValue :'N'
    },


  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
  {
    underscored: true
  });
  return Country;
};
