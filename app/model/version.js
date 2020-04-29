'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Version = app.model.define('version', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_id: INTEGER,
    name: STRING(255),
    sort: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Version.associate = function() {
    app.model.Version.hasMany(app.model.Story);
    app.model.Version.belongsTo(app.model.Project);
  };

  return Version;
};
