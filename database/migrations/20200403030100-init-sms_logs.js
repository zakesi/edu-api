'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('sms_logs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      template: STRING(30),
      content: TEXT,
      phone: STRING(30),
      code: STRING(30),
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('sms_logs');
  },
};
