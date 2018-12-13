var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Designation_MST = sequelize.define('mst_designation', {
    designation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    designation: {
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
  return Designation_MST;
};
