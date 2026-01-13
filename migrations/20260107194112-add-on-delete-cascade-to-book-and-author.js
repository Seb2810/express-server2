'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     // Met à jour la clé étrangère pour ajouter ON DELETE CASCADE
    await queryInterface.addConstraint('Books', {
      fields: ['userId'],  // Champ de la clé étrangère
      type: 'foreign key',
      name: 'custom_constraint_books_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE'  // Ajout de la contrainte ON DELETE CASCADE
    });

    await queryInterface.addConstraint('Livres', {
      fields: ['authorId'],  // Champ de la clé étrangère
      type: 'foreign key',
      name: 'custom_constraint_livres_authorId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE'  // Ajout de la contrainte ON DELETE CASCADE
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
