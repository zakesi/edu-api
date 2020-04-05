'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Smslog = app.model.define('sms_log', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    template: STRING(30),
    content: TEXT,
    phone: STRING(30),
    code: STRING(30),
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Smslog;
};
