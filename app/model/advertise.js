'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Advertise = app.model.define('advertises', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    slug: TEXT,
    width: INTEGER,
    height: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, { timestamps: false });

  // Advertise.associate = function() {
  //   app.model.Advertise.hasMany(app.model.Material);
  // };

  return Advertise;
};
