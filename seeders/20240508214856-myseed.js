'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const courses = [
      {
        firstName: 'Sylvestre',
        lastName: 'Stalone',
        createdAt: false,
        // don't generate an "updatedAt" attribute
        updatedAt: false
       
      },
      {
        firstName: 'John',
        lastName: 'Malcovich',
        createdAt: false,
         updatedAt: false 
       },
    
    {
      firstName: 'Johnny',
      lastName: 'Depp',
      createdAt: false,
       updatedAt: false 
     
  }]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', courses , {});


    await queryInterface.bulkInsert('Books', [{
         name: 'Rambo',
         userId: 1,
         createdAt: false,
         updatedAt: false  
       },
       {
        name: 'Red',
        userId: 2,
        createdAt:false,
        updatedAt: false
       },
       {
        name: 'pirates des Caraibes',
        userId: 3,
        createdAt: false,
        updatedAt:false
     
       }
      
      ],  {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Users', null, {});


  }
};
