'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('stacks', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      slug: STRING(255),
      image_url: STRING(1000),
      tag_line: STRING(1000),
      description: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('stacks');
  },
};
