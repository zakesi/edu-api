'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('courses', [
      {
        name: 'HTML Basic',
        short_name: '超文本 - Web 必修课程',
        status: 1,
        tips: '在网页开发中，前端重要语言有三个，分别是：HTML、CSS、JavaScript，HTML负责页面结构、CSS负责样式、JavaScript负责事件。HTML为前端开发第一步基础，加油！',
        description: 'HTML 全称超文本标记语言，它是网页构成的基础，我们见过的网页都离不开 HTML 代码。本课程从HTML代码的结构写法入手，了解常见的HMTL标签和属性，了及各类HTML标签的用法。通过案例结合，达到学以致用。',
        image_url: "https://vip-assets.jiker.com/_for_neon_project/1591172190571_410aa5e4-b85a-430d-b09b-8b57bedf8b76.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'CSS Basic',
        status: 1,
        short_name: '层叠样式表 - Web 入门必修课',
        tips: '学习CSS前 ，请先学习 HTML 基础部分。',
        description: 'CSS 全称为层叠样式表，用于定义网页的展现形式。本课程主要学习通过 CSS 代码修改网页中的文本、背景、排版布局等，大家可以根据自己的需求设置不同的样式风格。最后通过实例加深理解，快速掌握并应用在开发中。',
        image_url: "https://vip-assets.jiker.com/_for_neon_project/1591172268512_0ed10971-afa2-4f07-a0be-0452b1cd0e77.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'JavaScript Basic',
        status: 1,
        short_name: 'JavaScript - Web 必修课程',
        tips: '本课程为JavaScript语言基础，不涉及浏览器DOM 和 BOM。',
        description: '本课程从 JavaScript 语言的发展、开发环境等介绍入手，由浅入深地讲解 JavaScript 基本语法、函数。让您快速认识JavaScript，熟悉 JavaScript 基本语法。',
        image_url: "https://vip-assets.jiker.com/_for_neon_project/1591172238212_819bfbdb-382a-49b5-938e-cd9121c773d7.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'Vue Basic',
        status: 1,
        short_name: 'Vue.js前端框架详解－基础&进阶&实战',
        tips: '学习 Vue.js 前 ，请先学习 JavaScript 基础部分。',
        description: '通过本课程的系统学习，学员将学会和掌握轻量、易学但功能强大的Vue.js前端开发库，以及由Vue.js及其高级工具和插件库组成的前端开发“框架”。',
        image_url: "https://vip-assets.jiker.com/_for_neon_project/1591175810826_attach-6ae2b991-803f-4b63-bda9-89434d70d665.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('chapters', [
      {
        name: 'HTML 基础',
        course_id: 1,
        sort: 1,
      },
      {
        name: '百度实战',
        course_id: 1,
        sort: 2,
      },
    ]);

    await queryInterface.bulkInsert('sections', [
      {
        chapter_id: 1,
        name: '概览',
        content: '# 概览',
        video_url: 'http://as-public.qiniu.prodegree.cc/section/2018/1029/rLG7sD03JNB2pdNp67qOjkfI7Y1H1Tcgrcfn7RGP.mp4'
      },
      {
        chapter_id: 1,
        name: '结构标签',
        content: '# 结构标签 ',
        video_url: 'http://as-public.qiniu.prodegree.cc/section/2018/1029/NoFWNYUMzVuHS9YFNFyScBKa3DDGrXDzKZY2P07I.mp4'
      },
      {
        chapter_id: 1,
        name: '文本标签',
        content: '# 文本标签',
        video_url: 'http://as-public.qiniu.prodegree.cc/section/2018/1029/T2R85W8bszdoOz5U7z42XAetUAQesYvtL6JapwvA.mp4'
      },
      {
        chapter_id: 2,
        name: "百度首页 - HTML",
        content: "# 百度实战 - HTML",
        video_url: 'http://as-public.qiniu.prodegree.cc/section/2018/1029/LDx3bCMFS9GqOVQ0jWjsFUE7m3Rwmltsb9rVSIGd.mp4'
      }
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('sections', null, {});
    await queryInterface.bulkDelete('chapters', null, {});
    await queryInterface.bulkDelete('courses', null, {});
  },
};
