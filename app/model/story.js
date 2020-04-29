'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Story = app.model.define('story', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    version_id: INTEGER,
    project_id: INTEGER,
    name: STRING(255),
    content: TEXT,
    sort: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Story.associate = function() {
    app.model.Story.hasMany(app.model.Task);
    app.model.Story.belongsTo(app.model.Version);
  };

  return Story;
};
