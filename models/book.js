'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   /* static associate(models) {
     Book.belongsTo(models.User)
    }*/
  }

Book.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Book',
      timestamps: true
    }
  );

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'user',
      onDelete: 'CASCADE'
    });
  };

  return Book;
};

  /*
  Book.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  },
  { sequelize, timestamps: true }
);


  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'book',
      onDelete: 'CASCADE'
    });
  };

  return Book;
};
*/