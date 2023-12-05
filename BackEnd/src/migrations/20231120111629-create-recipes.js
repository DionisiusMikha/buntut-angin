'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      doctor_id: {
        type: Sequelize.INTEGER
      },
      suka : {
        type: Sequelize.INTEGER
      },
      rating : {
        type: Sequelize.FLOAT,
      },
      image_url : {
        type: Sequelize.STRING
      },
      comments : {
        type: Sequelize.STRING
      },
<<<<<<< Updated upstream
      calories: {
        type: Sequelize.INTEGER,
      },
      carbo: {
        type: Sequelize.FLOAT,
      },
      protein: {
        type: Sequelize.FLOAT
      },
      fat: {
        type: Sequelize.FLOAT
=======
      nutritions : {
        type: Sequelize.STRING
>>>>>>> Stashed changes
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};