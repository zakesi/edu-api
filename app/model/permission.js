'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Permission = app.model.define('permission', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    slug: STRING(255),
    group_id: INTEGER,
  }, { timestamps: false });

  Permission.associate = function() {
    app.model.Permission.belongsTo(app.model.PermissionGroup, { 
      foreignKey: 'group_id',
     });
  };

  return Permission;
};
