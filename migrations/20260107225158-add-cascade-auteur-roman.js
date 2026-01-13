'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 🔥 Supprimer l'ancienne contrainte si elle existe
    await queryInterface.removeConstraint('Romans', 'Romans_auteurId_fkey')
      .catch(() => {});

    // 🔥 Ajouter la FK avec CASCADE
    await queryInterface.addConstraint('Romans', {
      fields: ['auteurId'],
      type: 'foreign key',
      name: 'Romans_auteurId_fkey',
      references: {
        table: 'Auteurs',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Romans', 'Romans_auteurId_fkey');
  }
};