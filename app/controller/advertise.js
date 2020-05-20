'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  slug: 'string',
  width: 'number',
  height: 'number',
};

class advertiseController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.advertise.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    })
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const advertise = await ctx.service.advertise.show(id);
    ctx.body = { error_code: 0, data: { advertise }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, slug, width, height } = ctx.request.body;
    ctx.validate({
      name: createRule.name,
      slug: createRule.slug,
      width: createRule.width,
      height: createRule.height,
    }, ctx.request.body);
    console.log(ctx.model.Advertise, "ctx.model.Advertise")
    const advertise = await ctx.model.Advertise.create({
      name, slug, width, height,
      created_at: new Date(),
    })
    ctx.body = { error_code: 0, data: { id: advertise.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, slug, width, height } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Advertise.update({
      name, slug, width, height,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.advertise.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = advertiseController;
