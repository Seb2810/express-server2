'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  /*  static associate(models) {
      // define association here
    }*/
  }
  Livre.init({
    bookname: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Livre',
  },
  { sequelize, timestamps: true });


  
  Livre.associate = (models) => {
    Livre.belongsTo(models.Author, {
      foreignKey: {
        name: 'authorId',
        allowNull: false
      },
      as: 'auteur'
    });
  };
  return Livre;
};