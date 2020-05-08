'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const PermissionGroup = app.model.define('permission_group', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
  }, { timestamps: false });

  PermissionGroup.associate = function() {
    app.model.PermissionGroup.hasMany(app.model.Permission, {
      foreignKey: 'group_id',
    });
  };

  return PermissionGroup;
};
