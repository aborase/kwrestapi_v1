var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Stream = sequelize.define('mst_stream', {
    stream_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    stream: {
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
  return Stream;
};
