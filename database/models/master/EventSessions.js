var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var EventSessions_MST = sequelize.define('mst_event_session', {
    event_session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
     event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },   
    orator_id: {
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
  return EventSessions_MST;
};
