var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var ResearchInterest = sequelize.define('mst_research_interest', {
    researchinterest_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    researchinterest: {
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
  return ResearchInterest;
};
