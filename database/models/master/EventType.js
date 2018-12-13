var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var EventType_MST = sequelize.define('mst_event_type', {
    event_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
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
  return EventType_MST;
};
