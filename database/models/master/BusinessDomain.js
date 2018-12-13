var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var BusinessDomain = sequelize.define('mst_business_domain', {
    business_domain_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    
    domain: {
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
  return BusinessDomain;
};
