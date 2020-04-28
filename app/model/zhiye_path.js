'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const ZhiyePath = app.model.define('zhiye_path', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    sort: INTEGER,
    zhiye_id: INTEGER,
    description: TEXT,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  ZhiyePath.associate = function() {
    app.model.ZhiyePath.belongsTo(app.model.Zhiye);
    app.model.ZhiyePath.belongsToMany(app.model.Course, {
      through: 'zhiye_course', 
      foreignKey: 'pathId'
    });
  };
  return ZhiyePath;
};
