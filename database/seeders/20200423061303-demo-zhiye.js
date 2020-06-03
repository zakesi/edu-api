'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('zhiyes', [
      {
        name: 'Web 前端工程师',
        description: 'Web前端工程师是目前最火的互联网职业，它能充分理解项目需求和设计需求，并与设计师、后端工程师紧密合作，产出高质量的产品前端层，为用户呈现最好的界面交互体验。',
        sort: 1,
        status: 1,
        image_url: 'https://vip-assets.jiker.com/_for_neon_project/1591154372893_web.0579d968.png',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: '微信小程序工程师',
        description: '微信小程序开发工程师是当前互联网行业里亟需招聘岗位，综合运用微信提供的生态和前端技术，集设计、前端、后端、运维于一身，为用户提供接近原生的交互体验，是一个新兴的“全栈”发展方向。',
        sort: 2,
        status: 0,
        image_url: 'https://vip-assets.jiker.com/_for_neon_project/1591154402997_wechat.edbfafea.png',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'PHP 工程师',
        status: 0,
        description: 'PHP被称为世界上最好的语言，它是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，入门简单，容易掌握，利于学习，使用广泛。PHP语言可操纵多种主流与非主流的数据库、支持面向对象的编程、支持跨平台的操作。',
        sort: 3,
        image_url: 'https://vip-assets.jiker.com/_for_neon_project/1591154429284_php.1f8fcd1c.png',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'Python 数据分析工程师',
        status: 0,
        description: 'Python 被广泛的应用在 Web开发、爬虫开发、数据分析、人工智能、科学运算等各个技术领域，他是工程师的最爱的效率工具，因其庞大的类库，让你的项目能够快速的完成试错，随着大数据和AI时代的开启，Python 成为数据专家和AI工程师必备的技能之一。',
        sort: 4,
        image_url: 'https://vip-assets.jiker.com/_for_neon_project/1591154452763_python.7079bf08.png',
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
