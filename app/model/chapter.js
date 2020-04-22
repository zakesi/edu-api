'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Chapter = app.model.define('chapter', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    course_id: INTEGER,
    name: STRING(255),
    sort: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Chapter.associate = function() {
    app.model.Chapter.belongsTo(app.model.Course);
    app.model.Chapter.hasMany(app.model.Section);
  };

  return Chapter;
};
