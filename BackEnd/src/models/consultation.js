'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultation.init({
    doctor_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    jam: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};