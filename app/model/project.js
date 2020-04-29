'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    description: TEXT,
    content: TEXT,
    status: INTEGER,
    image_url: TEXT,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Project.associate = function() {
    app.model.Project.hasMany(app.model.Version);
  };

  return Project;
};
