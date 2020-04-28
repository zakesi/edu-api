'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('companies', [{
      name: '扎克斯（广州）科技有限公司',
      short_name: '扎克斯',
      slogan: '技术成就梦想之美',
      code: '91440101MA5ATTBD9B',
      introduction: '沉浸式编程教学',
      contact_name: 'Jax',
      contact_phone: '13511111111',
    }, {
      name: '构建未来（深圳）科技有限公司',
      short_name: '构建未来',
      slogan: '让人才更有价值',
      code: '91440300MA5FPN3Y6T',
      introduction: '让人才更有价值',
      contact_name: 'Jay',
      contact_phone: '13511111112',
    }]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
