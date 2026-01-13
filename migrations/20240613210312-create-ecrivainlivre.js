'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ecrivainlivres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      mylivreId: {
        type: Sequelize.INTEGER,
        allowNull: false,  
          references: {
            model: 'Mylivres',
             key: 'id',
          }
         
        },
        
       ecrivainId: {
          type: Sequelize.INTEGER,
          allowNull: false,  
          references: {
            model:'Ecrivains',
            key: 'id'
        
          }
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
/*
    queryInterface.addConstraint("Ecrivainlivres", {
      type: "FOREIGN KEY",
      name: "Ecrivainlivres_id_fkey",
      fields: ["ecrivainid"],
      references: {
          table: "evrivains",
          field: "id"
      }
  });
  queryInterface.addConstraint("Ecrivainlivres", {
      type: "FOREIGN KEY",
      name: "Ecrivainlivres_id_fkey",
      fields: ["mylivreid"],
      references: {
          table: "mylivres",
          field: "id"
      }
  });
*/

  },



  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ecrivainlivres');
  }
};