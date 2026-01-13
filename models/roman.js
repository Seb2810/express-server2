'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {


  class Roman extends Model {}

  Roman.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Roman',
      timestamps: true
    }
  );

  Roman.associate = (models) => {
    Roman.belongsTo(models.Auteur, {
      foreignKey: {
        name: 'auteurId',
        allowNull: false
      },
      as: 'auteur',
      onDelete: 'CASCADE'
    });
  };

  return Roman;
};
/*  
  class Roman extends Model {
    static associate(models) {
      // define association here
    }
  }
  Roman.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roman',
  });

  Roman.associate = (models) => {
    Roman.belongsTo(models.Auteur, {
      foreignKey: {
        name: 'auteurId',
        allowNull: false
      },
      as: 'author'
    });
  };
  return Roman;
};
*/