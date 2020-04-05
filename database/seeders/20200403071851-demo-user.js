'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [{
      name: 'John',
      phone: '13511111111',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Jax',
      phone: '13522222222',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
