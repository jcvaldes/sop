'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('DistributionStatus',
  [{
    code: 'CP',
    description: 'En planta',
    active: 'true',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    code: 'CE',
    description: 'Enviado',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('DistributionStatus', null, {}),
};
