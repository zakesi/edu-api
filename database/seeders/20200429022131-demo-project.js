'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('projects', [
      {
        name: 'EDU',
        description: '一站式教育云',
        content: '内容内容',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        name: 'ONE',
        description: '一站式学习云',
        content: '内容内容',
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('versions', [
      {
        name: 'v0 - 基础环境',
        project_id: 1,
        sort: 1,
      },
      {
        name: 'v1.0 - 课程管理',
        project_id: 1,
        sort: 2,
      },
      {
        name: 'v2.0 - 项目管理',
        project_id: 1,
        sort: 3,
      },
    ]);

    await queryInterface.bulkInsert('stories', [
      {
        name: 's1 - 开发：仓库管理',
        project_id: 1,
        version_id: 1,
        sort: 1,
      },
      {
        name: 's2 - 开发：框架搭建',
        project_id: 1,
        version_id: 1,
        sort: 2,
      },
      {
        name: 's1 - 管理后台：课程管理',
        project_id: 1,
        version_id: 2,
        sort: 1,
      },
      {
        name: 's2 - 管理后台：职业管理',
        project_id: 1,
        version_id: 2,
        sort: 2,
      },
    ]);

    await queryInterface.bulkInsert('tasks', [
      {
        name: 't1 - 运维：Github 仓库创建',
        project_id: 1,
        version_id: 2,
        story_id: 1,
        sort: 1,
        content: '创建项目仓库：edu-admin、edu-api',
      },
      {
        name: 't2 - 运维：给开发者添加权限',
        project_id: 1,
        version_id: 2,
        story_id: 1,
        sort: 2,
        content: '给项目开发者添加开发权限',
      },
      {
        name: 't1 - 架构：Express API 基础环境搭建',
        project_id: 1,
        version_id: 2,
        story_id: 2,
        sort: 2,
        content: '#内容',
      },
      {
        name: 't2 - 架构：Vue.js Admin 基础环境搭建',
        project_id: 1,
        version_id: 2,
        story_id: 2,
        sort: 2,
        content: '#内容',
      },
      {
        name: 't1 - 后端：课程相关 DB、migration、seed',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 后端：课程创建 API',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 后端：课程列表 API',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 后端：课程编辑 API',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 前端：课程创建',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 前端：课程列表',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
      {
        name: 't2 - 前端：课程编辑',
        project_id: 1,
        version_id: 2,
        story_id: 3,
        sort: 1,
        content: '#内容',
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('versions', null, {});
    await queryInterface.bulkDelete('stories', null, {});
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
