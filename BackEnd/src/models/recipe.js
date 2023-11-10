'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    step: DataTypes.STRING,
    unit_measurement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};