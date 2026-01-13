'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {

    // 🔥 FK vers Ecrivain
    await queryInterface.addConstraint('Ecrivainlivres', {
      fields: ['ecrivainId'],
      type: 'foreign key',
      name: 'fk_ecrivainlivre_ecrivain',
      references: {
        table: 'Ecrivains',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // 🔥 FK vers Mylivre
    await queryInterface.addConstraint('Ecrivainlivres', {
      fields: ['mylivreId'],
      type: 'foreign key',
      name: 'fk_ecrivainlivre_mylivre',
      references: {
        table: 'Mylivres',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Ecrivainlivres', 'fk_ecrivainlivre_ecrivain');
    await queryInterface.removeConstraint('Ecrivainlivres', 'fk_ecrivainlivre_mylivre');
  }
};