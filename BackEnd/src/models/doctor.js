'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    address: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
  });
  return Doctor;
};