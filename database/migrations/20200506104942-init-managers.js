'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DOUBLE, TEXT } = Sequelize;
    await queryInterface.createTable('managers', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      phone: STRING(255),
      role_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      description: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('permission_groups', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
    });
    await queryInterface.createTable('permissions', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      slug: STRING(255),
      group_id: INTEGER,
    });
    await queryInterface.createTable('role_permissions', {
      role_id: INTEGER,
      permission_id: INTEGER,
      permission_slug: STRING(255),
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('managers');
    await queryInterface.dropTable('permission_groups');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('role_permissions');
  },
};
