var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Specialization_MST = sequelize.define('mst_specialization', {
        specialization_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        specialization: {
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
    return Specialization_MST;
};

