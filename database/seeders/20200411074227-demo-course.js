'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('courses', [
      {
        name: 'HTML',
        short_name: 'HTML 基础',
        tips: 'Web 入门必修课',
        description: 'HTML 描述',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'CSS',
        short_name: 'CSS 基础',
        tips: 'Web 入门必修课',
        description: 'CSS 描述',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('chapters', [
      {
        name: '第一章',
        course_id: 1,
        sort: 1,
      },
      {
        name: '第二章',
        course_id: 1,
        sort: 2,
      },
    ]);

    await queryInterface.bulkInsert('sections', [
      {
        chapter_id: 1,
        name: '第一节',
        content: '# 内容',
      },
      {
        chapter_id: 1,
        name: '第二节',
        content: '# 内容',
      },
      {
        chapter_id: 2,
        name: '第三节',
        content: '# 内容',
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('sections', null, {});
    await queryInterface.bulkDelete('chapters', null, {});
    await queryInterface.bulkDelete('courses', null, {});
  },
};
