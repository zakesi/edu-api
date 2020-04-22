'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Course = app.model.define('course', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    short_name: STRING(255),
    tips: STRING(255),
    description: TEXT,
    status: INTEGER,
    image_url: TEXT,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Course.associate = function() {
    app.model.Course.hasMany(app.model.Chapter);
  };

  return Course;
};
