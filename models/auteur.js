'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
Auteur.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Auteur',
      timestamps: true
    }
  );

  Auteur.associate = (models) => {
    Auteur.hasMany(models.Roman, {
      foreignKey: {
        name: 'auteurId',
        allowNull: false
      },
      as: 'romans',
      onDelete: 'CASCADE',   // 🔥
      hooks: true            // 🔥 OBLIGATOIRE
    });
  };

  return Auteur;
};

  /*
  Auteur.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auteur',
  }, { sequelize, timestamps: true }
);

Auteur.associate = (models) => {
  Auteur.hasMany(models.Romans, {
    foreignKey: {
      name: 'auteurId',
      allowNull: false
    },
    as: 'author'
  });
};


  return Auteur;
};
*/