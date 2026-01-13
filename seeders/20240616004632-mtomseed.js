'use strict';
const {Model} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Ecrivain= Model.Ecrivain
    Mylivre= Model.Mylivre
    const amidala = await Ecrivain.create({ firstName: 'Umberto', lastName: 'Ecco' });
const queen = await Mylivre.create({ name: 'mythologie' });
await amidala.addMylivre(queen);
const result = await Ecrivain.findOne({
  where: { firstName: 'Umberto' },
  include: Mylivre,
});
console.log(result);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
