'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  image_url: 'string',
  description: 'string',
  status: 'number',
};

class ZhiyeController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.zhiye.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const zhiye = await ctx.service.zhiye.show(id);
    ctx.body = { error_code: 0, data: { zhiye }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, image_url, description, status = 0 } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const zhiye = await ctx.model.Zhiye.create({
      name, image_url, description, status,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: zhiye.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, image_url, description, status } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Zhiye.update({
      name, image_url, description, status,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.zhiye.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ZhiyeController;
