var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Venue_MST = sequelize.define('mst_venue', {
    venue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    google_map_link: {
      type: DataTypes.STRING,
      allowNull: true
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
  return Venue_MST;
};
