var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Event_MST = sequelize.define('mst_event', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
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
  return Event_MST;
};
