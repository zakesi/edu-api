'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DOUBLE, TEXT } = Sequelize;
    await queryInterface.createTable('zhiyes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      sort: INTEGER,
      image_url: TEXT,
      description: TEXT,
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('zhiye_paths', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      sort: INTEGER,
      zhiye_id: INTEGER,
      description: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('zhiye_courses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sort: INTEGER,
      zhiye_id: INTEGER,
      path_id: INTEGER,
      course_id: INTEGER,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('zhiye_paths');
  },
};
