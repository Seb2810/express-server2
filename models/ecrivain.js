'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Ecrivain extends Model {}

  Ecrivain.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Ecrivain',
      timestamps: true
    }
  );

  Ecrivain.associate = (models) => {
    Ecrivain.belongsToMany(models.Mylivre, {
      through: models.Ecrivainlivre,
      foreignKey: 'ecrivainId',
      otherKey: 'mylivreId',
      as: 'livres',
      onDelete: 'CASCADE'
    });
  };

  return Ecrivain;
};

 