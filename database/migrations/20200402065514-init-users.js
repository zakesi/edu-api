'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      real_name: STRING(255),
      unionid: STRING(255),
      section_key: STRING(255),
      phone: STRING(255),
      avatar_url: TEXT,
      sex: INTEGER,
      birthday: DATE,
      introduction: STRING(500),
      visit_at: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('resumes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      job: STRING(255),
      city: TEXT,
      experience: TEXT,
      capability: TEXT,
      skills: TEXT,
      items: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('resumes');
  },
};
