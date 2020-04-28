'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const ZhiyeCourse = app.model.define('zhiye_course', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sort: INTEGER,
    zhiye_id: INTEGER,
    path_id: INTEGER,
    course_id: INTEGER,
  }, { timestamps: false });

  return ZhiyeCourse;
};
