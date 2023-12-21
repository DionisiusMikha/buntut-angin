'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Steps.init({
    desc: DataTypes.STRING,
    recipe_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Steps',
    tableName: 'steps',
  });
  return Steps;
};