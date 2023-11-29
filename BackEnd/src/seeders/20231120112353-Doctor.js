'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Doctors', [
    {
      display_name : "Dionisius Mikha",
      email : "dion123@gmail.com",
      username : "dion",
      password : "123",
      birthdate : "2003-10-24",
      phone_number : "08123456789",
      profile_picture : null,
      address : "jalan asdsaddasdasds",
    },
    {
      display_name : "Evan",
      email : "epannn@gmail.com",
      username : "evan",
      password : "123",
      birthdate : "2003-06-25",
      phone_number : "08123456789",
      profile_picture : null,
      address : "jalan kghfdasdads",
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
