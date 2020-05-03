'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('stacks', [{
      id: 1,
      name: 'HTML',
      slug: 'html',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 2,
      name: 'CSS',
      slug: 'css',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('stacks', null, {});
  },
};
