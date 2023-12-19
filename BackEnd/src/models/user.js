'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      balance: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      address: DataTypes.STRING,
      age: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      genders: DataTypes.STRING,
      email_verification_code: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
