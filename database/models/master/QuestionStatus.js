var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var QuestionStatus_MST = sequelize.define('mst_question_status', {
    question_status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status: {
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
  return QuestionStatus_MST;
};
