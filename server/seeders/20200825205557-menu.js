'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('Menu',
  [{
    title: '11-Carga de Eventos',
    icon: 'fas fa-calendar-star',
    uri: null,
    ParentId: null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    title: 'Documento de Entrega',
    icon: 'far fa-id-card',
    uri: '/documentos-entrega',
    ParentId: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    title: 'Documento de Imposición',
    icon: 'fas fa-file-certificate',
    uri: '/documentos-imposicion',
    ParentId: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Menu', null, {}),
};
