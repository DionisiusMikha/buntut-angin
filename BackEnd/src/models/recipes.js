'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipes.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    doctor_id: DataTypes.INTEGER,
    suka: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    comments: DataTypes.STRING,
    image_url: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    carbo: DataTypes.FLOAT,
    protein: DataTypes.FLOAT,
    fat: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Recipes',
    tableName: 'recipes',
  });
  return Recipes;
};