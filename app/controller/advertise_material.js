'use strict';

const Controller = require('egg').Controller;

const createRule = {
  advertise_id: 'number',
  material_id: 'number',
  sort: 'number',
};

class advertiseMaterialController extends Controller {
  async create() {
    const { ctx } = this;
    const { advertise_id, material_id, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);

    const material = await ctx.model.Material.findByPk(material_id);
    if(!material) {
      return ctx.body = { error_code: 1, message: '没有此物料' }
    };
    const advertiseMaterialHas = await ctx.model.AdvertiseMaterial.findOne({
      where: {
        material_id,
        advertise_id 
      }
    })
    if(advertiseMaterialHas) {
      return ctx.body = { error_code: 1, message: '该物料已经绑定过此广告位' }
    }
    const advertiseMaterial = await ctx.model.AdvertiseMaterial.create({
      advertise_id, material_id, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: advertiseMaterial.id }, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const material = await ctx.model.AdvertiseMaterial.findByPk(id);
    await material.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { advertise_materials } = ctx.request.body;
    ctx.validate({
      advertise_materials: 'array',
    }, ctx.request.body);
    const updateDatas = advertise_materials.map(async (advertiseMaterialId, index) => {
      return await ctx.model.AdvertiseMaterial.update({
        sort: index + 1,
      }, {
        where: {
          id: advertiseMaterialId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = advertiseMaterialController;
