var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Qualification = sequelize.define('mst_qualification', {
    qualification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    degree: {
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
  return Qualification;
};
