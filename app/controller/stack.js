'use strict';

const Controller = require('egg').Controller;
const { fn } = require('sequelize');
const createRule = {
  name: 'string',
  slug: 'string',
  image_url: 'string',
  description: 'string',
};

class stackController extends Controller {
  async index() {
    const { ctx } = this;
    const { status, name } = ctx.query;
    const datas = await ctx.service.stack.pagination({
      where: { status, name },  
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const stack = await this.ctx.model.Stack.findByPk(id);
    ctx.body = { error_code: 0, data: { stack }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, slug, image_url, description } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const stack = await ctx.model.Stack.create({
      name, slug, image_url, description,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: stack.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, slug, image_url, description, status } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Stack.update({
      name, slug, image_url, description, status,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const stack = await ctx.model.Stack.findByPk(id);
    await stack.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async random() {
    const { ctx } = this;
    const id = ctx.params.id;
    const stack = await ctx.model.Stack.findByPk(id);
    const question = await ctx.model.SkillQuestion.findAll({ order: fn('RAND'), limit: 20 })
    ctx.body = { error_code: 0, message: 'success', data: { stack, question } };
  }
}

module.exports = stackController;
