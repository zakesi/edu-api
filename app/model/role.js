'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    description: TEXT,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Role.associate = function() {
    app.model.Role.hasMany(app.model.Manager);
    app.model.Role.hasMany(app.model.RolePermission);
  };

  return Role;
};
