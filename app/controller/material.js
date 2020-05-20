'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  upload_file: 'string',
  target: 'string',
  jump_url: 'string',
};

class MaterialController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.material.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    })
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const material = await ctx.service.material.show(id);
    ctx.body = { error_code: 0, data: { material }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, upload_file, target, jump_url } = ctx.request.body;
    ctx.validate({
      name: createRule.name,
      upload_file: createRule.upload_file,
      target: createRule.target,
      jump_url: createRule.jump_url,
    }, ctx.request.body);
    const material = await ctx.model.Material.create({
      name, upload_file, target, jump_url,
      created_at: new Date(),
    })
    ctx.body = { error_code: 0, data: { id: material.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, upload_file, target, jump_url } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Material.update({
      name, upload_file, target, jump_url,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.material.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = MaterialController;
