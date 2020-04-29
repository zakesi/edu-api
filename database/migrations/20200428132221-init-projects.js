'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('projects', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      description: TEXT,
      content: TEXT,
      status: INTEGER,
      image_url: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('versions', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project_id: INTEGER,
      name: STRING(255),
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('stories', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      version_id: INTEGER,
      project_id: INTEGER,
      name: STRING(255),
      content: TEXT,
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('tasks', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      story_id: INTEGER,
      version_id: INTEGER,
      project_id: INTEGER,
      name: STRING(255),
      content: TEXT,
      status: INTEGER,
      level: { type: INTEGER, comment: '1-入门、2-初级、3-中级、4-高级'},
      platform: { type: INTEGER, comment: '1-API、2-前台、3-后台、4-小程序'},
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('projects');
    await queryInterface.dropTable('versions');
    await queryInterface.dropTable('stories');
    await queryInterface.dropTable('tasks');
  },
};
