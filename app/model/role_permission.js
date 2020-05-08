'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const RolePermission = app.model.define('role_permission', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_id: INTEGER,
    permission_slug: STRING(255),
  }, { timestamps: false });

  RolePermission.associate = function() {
    app.model.RolePermission.belongsTo(app.model.Role);
  };

  return RolePermission;
};
