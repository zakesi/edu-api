'use strict';

module.exports = app => {
  const { INTEGER, DATE, TEXT } = app.Sequelize;

  const SkillQuestion = app.model.define('skill_question', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    stem: TEXT,
    stack_id: INTEGER,
    level: INTEGER,
    option: TEXT,
    correct: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  SkillQuestion.associate = function() {
    app.model.SkillQuestion.belongsTo(app.model.Stack);
  };

  return SkillQuestion;
};
