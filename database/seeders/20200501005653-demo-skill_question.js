'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('skill_questions', [{
      stem: 'HTML题目',
      stack_id: 1,
      option: "[0,1,2,3]",
      currect: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      stem: 'CSS题目',
      stack_id: 2,
      option: "[0,1,2,3]",
      currect: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('skill_questions', null, {});
  },
};
