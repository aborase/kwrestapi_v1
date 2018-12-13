var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('mst_status', {
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    
    status:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue :'Y'
    },
  
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
  {
    underscored: true
  });
  return Status;
};
