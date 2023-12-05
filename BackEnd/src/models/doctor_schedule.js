'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Schedule.init({
    doctor_id: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    start: DataTypes.TIME,
    end: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Doctor_Schedule',
  });
  return Doctor_Schedule;
};