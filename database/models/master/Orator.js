var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Orator_MST = sequelize.define('mst_orator', {
    orator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stream: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    work_description: {
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
  return Orator_MST;
};
