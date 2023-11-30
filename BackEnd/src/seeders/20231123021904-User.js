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
   await queryInterface.bulkInsert('Users', [
    {
      display_name : "Jessica Susanto",
      email : "jessica.susanto16@gmail.com",
      username : "jessica",
      password : "123",
      birthdate : "2003-08-16",
      balance : 100000,
      phone_number : "08123456789",
      profile_picture : null,
      address : "Jl. Raya Puncak KM 83",
      age : 20,
      weight : 50,
      height : 160,
      genders : "Female",
    }, 
    {
      display_name : "Calvin Harsono",
      email : "calvin.harsono@gmail.com",
      username : "kelpin",
      password : "123",
      birthdate : "2003-01-23",
      balance : 100000,
      phone_number : "08123456789",
      profile_picture : null,
      address : "jalan rumah",
      age : 20,
      weight : 62,
      height : 169,
      genders : "Male",
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
