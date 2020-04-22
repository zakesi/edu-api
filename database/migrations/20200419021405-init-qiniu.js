'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DOUBLE } = Sequelize;
    await queryInterface.createTable('upload_files', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      driver: STRING(255),
      bucket: STRING(255),
      space: STRING(255),
      path: STRING(2000),
      user_id: INTEGER,
      title: STRING(255),
      name: STRING(255),
      mime: STRING(255),
      hash: STRING(255),
      size: DOUBLE(20,2),
      extension: STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('upload_files');
  },
};
