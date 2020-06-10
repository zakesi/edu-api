'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('skill_questions', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      stem: TEXT,
      stack_id: INTEGER,
      level: INTEGER,
      option: TEXT,
      correct: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('skill_questions');
  },
};
