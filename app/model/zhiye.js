'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Zhiye = app.model.define('zhiye', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    sort: INTEGER,
    image_url: TEXT,
    description: TEXT,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  Zhiye.associate = function() {
    app.model.Zhiye.hasMany(app.model.ZhiyePath);
  };

  return Zhiye;
};
