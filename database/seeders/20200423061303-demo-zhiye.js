'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('zhiyes', [
      {
        name: 'Web 前端工程师',
        description: '前端工程师 描述',
        sort: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '微信小程序工程师',
        description: '微信小程序工程师 描述',
        sort: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('zhiye_paths', [
      {
        zhiye_id: 1,
        name: '入门',
        description: 1,
        sort: 1,
      },
      {
        zhiye_id: 1,
        name: '初级',
        description: 1,
        sort: 2,
      },
    ]);

    await queryInterface.bulkInsert('zhiye_courses', [
      {
        sort: 1,
        zhiye_id: 1,
        path_id: 1,
        course_id: 1,
      },
      {
        sort: 2,
        zhiye_id: 1,
        path_id: 1,
        course_id: 2,
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('zhiyes', null, {});
    await queryInterface.bulkDelete('zhiye_paths', null, {});
    await queryInterface.bulkDelete('zhiye_courses', null, {});
  },
};
