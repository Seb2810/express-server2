'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Ecrivainlivre extends Model {}

  Ecrivainlivre.init(
    {
      ecrivainId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      mylivreId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Ecrivainlivre',
      timestamps: true
    }
  );

  Ecrivainlivre.associate = (models) => {
    Ecrivainlivre.belongsTo(models.Ecrivain, {
      foreignKey: 'ecrivainId',
      onDelete: 'CASCADE'
    });

    Ecrivainlivre.belongsTo(models.Mylivre, {
      foreignKey: 'mylivreId',
      onDelete: 'CASCADE'
    });
  };

  return Ecrivainlivre;
};
