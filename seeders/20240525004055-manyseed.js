'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const course = [
      {
        firstName: 'Albert',
        lastName: 'Camus',
        createdAt: false,
        // don't generate an "updatedAt" attribute
        updatedAt: false
       
      },
      {
        firstName: 'Emile',
        lastName: 'Zola',
        createdAt: false,
         updatedAt: false 
       },
    
    {
      firstName: 'Gustave',
      lastName: 'Flaubert',
      createdAt: false,
       updatedAt: false 
     
  }]
  await queryInterface.bulkInsert('Auteurs', course , {});


  await queryInterface.bulkInsert('Romans', [{
       name: 'L\'étranger',
       auteurId: 1,
       createdAt: false,
       updatedAt: false  
     },
     {
      name: 'Germinal',
      auteurId: 2,
      createdAt:false,
      updatedAt: false
     },
     {
      name: 'La Curée',
      auteurId: 2,
      createdAt:false,
      updatedAt: false
     },
     {
      name: 'Madame Bovary',
      auteurId: 3,
      createdAt: false,
      updatedAt:false
   
     }
    
    ],  {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Romans', null, {});
    await queryInterface.bulkDelete('Auteurs', null, {});
  }
};
