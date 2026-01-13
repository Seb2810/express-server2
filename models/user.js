'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   /*static associate(models) {
    User.hasOne(models.Book ,)
    }*/
  }

User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Book, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'book',
      onDelete: 'CASCADE',   // 🔥 IMPORTANT
      hooks: true            // 🔥 OBLIGATOIRE pour que Sequelize déclenche le cascade
    });
  };

  return User;
};

  /*User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  },
  { sequelize, timestamps: true });

  User.associate = (models) => {
    User.hasOne(models.Book, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'user',
      onDelete: 'CASCADE' 
    });
  };



  return User;
};
*/