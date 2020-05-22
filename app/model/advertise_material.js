'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const AdvertiseMaterial = app.model.define('advertise_materials', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sort: INTEGER,
    advertise_id: INTEGER,
    material_id: INTEGER,
  }, { timestamps: false });

  return AdvertiseMaterial;
};
