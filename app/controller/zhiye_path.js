'use strict';

const Controller = require('egg').Controller;

const createRule = {
  zhiye_id: 'number',
  name: 'string',
  description: 'string',
  sort: 'number',
};

class ZhiyePathController extends Controller {
  async create() {
    const { ctx } = this;
    const { zhiye_id, name, description, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const path = await ctx.model.ZhiyePath.create({
      zhiye_id, name, description, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: path.id }, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const courses = await ctx.model.ZhiyeCourse.findAll({
      where: {
        path_id: id,
      }
    })
    ctx.body = { error_code: 0, data: { courses }, message: 'success' };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { zhiye_id, name, description } = ctx.request.body;
    ctx.validate({
      name: 'string',
      zhiye_id: 'number',
      description: 'string',
    }, ctx.request.body);
    await ctx.model.ZhiyePath.update({
      zhiye_id, name, description,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const path = await ctx.model.ZhiyePath.findByPk(id);
    await ctx.model.ZhiyeCourse.destroy({
      where: {
        path_id: id,
      },
    });
    await path.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { paths } = ctx.request.body;
    ctx.validate({
      paths: 'array',
    }, ctx.request.body);
    const updateDatas = paths.map(async (pathId, index) => {
      return await ctx.model.ZhiyePath.update({
        sort: index,
      }, {
        where: {
          id: pathId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ZhiyePathController;
