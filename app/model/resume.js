'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Resume = app.model.define('resume', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER,
    job: STRING(255),
    city: STRING(255),
    experience: STRING(255),
    capability: STRING(255),
    skills: STRING(255),
    items: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });
  return Resume;
};