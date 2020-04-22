'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('courses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      short_name: STRING(255),
      tips: STRING(255),
      description: TEXT,
      status: INTEGER,
      image_url: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('chapters', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      course_id: INTEGER,
      name: STRING(255),
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('sections', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      chapter_id: INTEGER,
      name: STRING(255),
      content: TEXT,
      video_url: TEXT,
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('chapters');
    await queryInterface.dropTable('sections');
  },
};
