'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('stacks', [{
      name: 'HTML',
      slug: 'html',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
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
