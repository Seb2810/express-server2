'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Mylivre extends Model {}

  Mylivre.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Mylivre',
      timestamps: true
    }
  );

  Mylivre.associate = (models) => {
    Mylivre.belongsToMany(models.Ecrivain, {
      through: models.Ecrivainlivre,
      foreignKey: 'mylivreId',
      otherKey: 'ecrivainId',
      as: 'ecrivains',
      onDelete: 'CASCADE'
    });
  };

  return Mylivre;
};
