var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var Client = sequelize.define('mst_client', {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    client_registration_id: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },

    mobile_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:  9999
    },
    country_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:  9999
    },
    state_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:  9999
    },
    city_other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact_nos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    business_domain_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:  9999
    },
    business_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    business_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client_logo_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client_logo: {
      type: DataTypes.STRING,
      allowNull: true
    },

    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Y'
    },
    deleted_at: DataTypes.DATE
  },
    {
      underscored: true
    });
  return Client;
};
