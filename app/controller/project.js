'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  description: 'string',
  // image_url: 'string',
  // status: 'number',
  // content: 'string'
};

class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.project.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const project = await ctx.service.project.show(id);
    ctx.body = { error_code: 0, data: { project }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, image_url, description, status = 0 } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const project = await ctx.model.Project.create({
      name, image_url, description, status,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: project.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, image_url, description, status, content  } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Project.update({
      name, image_url, description, status, content,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.project.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ProjectController;
