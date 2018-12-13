var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('feedback', {
    feedback_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
     user_id: {
      type: DataTypes.INTEGER,
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
  return Feedback;
};
