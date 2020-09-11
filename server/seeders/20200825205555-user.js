'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('Users',
  [{
    firstname: 'Juan',
    lastname: 'Valdés',
    username: 'jcvaldes',
    email: 'idevkingos@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    firstname: 'Cristian',
    lastname: 'Rodriguez',
    username: 'ccrodriguez',
    email: 'crodrigruez@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
