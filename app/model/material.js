'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Material = app.model.define('materials', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    upload_file: TEXT,
    target: TEXT,
    jump_url: TEXT,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });
  
  return Material;
};
