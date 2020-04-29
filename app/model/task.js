'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Task = app.model.define('task', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    story_id: INTEGER,
    version_id: INTEGER,
    project_id: INTEGER,
    content: TEXT,
    status: INTEGER,
    level: INTEGER,
    platform: INTEGER,
    sort: INTEGER,
    created_at: DATE,
  }, { timestamps: false });

  Task.associate = function() {
    app.model.Task.belongsTo(app.model.Story);
  };

  return Task;
};
