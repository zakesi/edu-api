'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Manager = app.model.define('manager', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    phone: STRING(255),
    role_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Manager.associate = function() {
    app.model.Manager.belongsTo(app.model.Role);
  };

  return Manager;
};
