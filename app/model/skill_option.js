'use strict';

module.exports = app => {
  const { INTEGER, DATE, TEXT } = app.Sequelize;
  const SkillQuestion = app.model.define('skill_option', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    question_id: INTEGER,
    option: TEXT,
    correct: INTEGER,
    sort: INTEGER,
  }, { timestamps: false });
  return SkillQuestion;
};
