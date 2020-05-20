'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  short_name: 'string',
  tips: 'string',
  image_url: 'string',
  description: 'string',
  status: 'number',
};

class CourseController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.course.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const course = await ctx.service.course.show(id);
    ctx.body = { error_code: 0, data: { course }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, short_name, tips, image_url, description, status = 0 } = ctx.request.body;
    ctx.validate({
      name: createRule.name,
      short_name: createRule.short_name,
      tips: createRule.tips,
      description: 'string',
    }, ctx.request.body);
    const course = await ctx.model.Course.create({
      name, short_name, tips, image_url, description, status,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: course.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, short_name, tips, image_url, description, status } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Course.update({
      name, short_name, tips, image_url, description, status,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.course.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
  async wwwRecommand() {
    const { ctx } = this;
    const limit = ctx.query.count || 4;
    const courses = await ctx.model.Course.findAll({ 
      limit, 
      where: {
        status: 1,
      },
      order: [['id', 'DESC']]
     });
    ctx.body = { error_code: 0, message: 'success', data: { courses } };
  }
}

module.exports = CourseController;
