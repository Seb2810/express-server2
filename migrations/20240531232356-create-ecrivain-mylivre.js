'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EcrivainMylivres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       mylivreId: {
      type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Mylivres',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
      
     ecrivainId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Ecrivains',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      
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
    await queryInterface.addColumn("EcrivainMylivres", "ecrivainId", {
      type: Sequelize.INTEGER,
      references: {
        model: "ecrivains", // model is just a table_name you are referencing 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
 
    });

    await queryInterface.addColumn("EcrivainMylivres", "mylivreId", {
      type: Sequelize.INTEGER,
      references: {
        model: "livres", // model is just a table_name you are referencing 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
 
    });
    */
    /*
    await queryInterface.addConstraint("EcrivainMylivres", {
      type: "foreign key",
      fields: ["id"],
      name: "mylivreId",
      references: {
        table: "livres",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
*/
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EcrivainMylivres');
  }
};