'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT, STRING } = Sequelize;
    await queryInterface.createTable('advertises', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      slug: TEXT,
      width: INTEGER,
      height: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('materials', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      upload_file: TEXT,
      target: TEXT,
      jump_url: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('advertise_materials', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      advertise_id: INTEGER,
      material_id: INTEGER,
      sort: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('advertises');
    await queryInterface.dropTable('materials');
    await queryInterface.dropTable('advertise_materials');
  }
};
